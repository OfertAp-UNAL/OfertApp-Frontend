import React, { Component } from "react";
import { performPayment, preparePayment } from "../../services/paymentService";
import { getConfig } from "../../services/configService";
import { toast } from "react-toastify";
import CustomButton from "./../common/Button/button";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import Input from "./../common/input";

class WithdrawAccountView extends Component {

    state = {
        amount: 0,
        prepared: false,
        inProcess: false,
        preferenceID : null
    }

    // Format amount to be displayed
    formatAmount( amount ) {
        return "COP $ " + amount.toLocaleString( "es-CO", { style: "currency", currency: "COP" } );
    }

    async componentDidMount() {
        const response = await getConfig();
        const { status, data } = response.data;
        if( status === "success" ) {

            // Initialize Mercado Pago SDK
            initMercadoPago( data.MP_PUBLIC_KEY, {
                locale: "es-CO"
            });
        }
    }

    updateAmount( amount ) {
        // Delete old bricks first
        if( window.cardPaymentBrickController)
            window.cardPaymentBrickController.unmount()
        this.setState({ amount, prepared: false, preferenceID: null, inProcess: false });
    }

    async preparePayment () {
        this.setState({ inProcess: true });
        try{
            const response = await preparePayment( this.state.amount )
            const { status, data } = response.data;
            if( status === "success" ) {
                this.setState({ prepared: true, preferenceID: data.id, inProcess: false });
                return;
            } else {
                toast.error( data );
            }
        } catch( e ) {
            toast.error( "Error al procesar el pago" );
        }
        this.setState({ inProcess: false });
        
    }

    componentWillUnmount() {
        // Delete old bricks first
        if( window.cardPaymentBrickController)
            window.cardPaymentBrickController.unmount()
    }

    // Create Mercado Pago Wallet Payment
    configureRecharge() {
        // Returns all neeeded configs for controls
        // to be rendered
        return {
            initialization : {
                amount : 1,
                preferenceId: this.state.preferenceID
            },
            customization : {
                paymentMethods: {
                    ticket: "all",
                    creditCard: "all",
                    debitCard: "all",
                }
            },
            onSubmit : async ( { selectedPaymentMethod, formData } ) => {
                return new Promise( async (resolve, reject) => {
                    try{
                        const response = await performPayment( {
                            ...( formData || {} ),
                            selectedPaymentMethod
                        });
                        const { status, data  } = response.data;
                        if( status === "success" ) {
                            // Only case where we will accept the payment
                            toast.success( "Pago realizado con éxito!" );
                            resolve( );
                        } else {
                            toast.error( data );
                            reject();
                        }
                    } catch( e ) {
                        toast.error( "Error al procesar el pago" );
                        reject();
                    }
                    // Delete old bricks first
                    if( window.cardPaymentBrickController)
                        window.cardPaymentBrickController.unmount()
                    this.setState({ prepared: false });
                });
            },
            onError : async (e) => {
                // callback llamado para todos los casos de error de Brick
                console.log( e );
            },
            onReady : async (_) => {
                // callback llamado cuando el Brick está listo.
                // Aquí puede ocultar cargamentos de su sitio, por ejemplo.
            }
        }
    }

    render() {
        const { onSubmit, onError, onReady, initialization, customization } = this.configureRecharge();
        return (
            <div className = "row text-center">
                <h1 className="col-12 ofertapp-page-subtitle">Recarga tu cuenta!</h1>
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-6 offset-3 mb-5">
                    <Input 
                        label="¿Cuánto deseas recargar? (COP $)" 
                        name="amount" 
                        type="number" 
                        onChange={ (e) => this.updateAmount( e.target.value ) }
                    />
                </div>
                {
                    this.state.amount >= 1000 && ( 
                        !this.state.prepared ?
                        <CustomButton
                            caption = "Listo!"
                            type = "primary"
                            onClick = { () => this.preparePayment() }
                            disabled = { this.state.inProcess }
                        />
                        :
                        <Payment
                            onSubmit = { onSubmit }
                            onError = { onError }
                            onReady = { onReady }
                            initialization = { initialization }
                            customization = { customization }
                        />
                    )
                }
            </div>
        )
    }
}

export default WithdrawAccountView;