import http from "./httpService";
import config from "../config.json";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "/publications/";

function productUrl(id) {
    return `${apiEndpoint}${id}/`;
}

export function getPublications() {
    return http.get(apiEndpoint);
}

export function getFakePublication(id) {
    //return http.get(productUrl(id));
    return {
        data: {
            title: "Super computador de la NASA",
            description: "El mejor computador de la NASA aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                " aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                " aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            minOffer: 100000,
            createdAt: "1956-03-26 23:22:37",
            endDate: "2050-10-28 12:59:01",
            available: true,
            reportable: true,
            category: {
                id: "2134567",
                name: "Computadores"
            },
            user: {
                id: "1234567",
                firstName: "Edgar",
                lastName: "Gonzalez",
                email: "edgonzalezdi@unal.edu.co",
                username: "Ola",
                createdAt: "1999-10-28 12:59:01",
                birthDate: "2021-06-11",
                idenIdType: "CC",
                phone: "40123",
                address: "Carrera 24 # 100-200",
                townId: 12.45,
                blocked: false,
                verified: true,
                accountType: "NQ",
                accountId: "40123",
                vipState: true,
                vipPubCount: 5,
                reputation: 0.45
            },
            comments: [
                {
                    id: "2213",
                    text: "Me enkanta",
                    title: "No aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                        " aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    createdAt: "1999-10-28 12:59:01",
                    user: {
                        id: "1234567",
                        firstName: "Edgar",
                        lastName: "Gonzalez",
                        email: "edgonzalezdi@unal.edu.co",
                        username: "Ola",
                        createdAt: "1999-10-28 12:59:01",
                        birthDate: "2021-06-11",
                        idenIdType: "CC",
                        phone: "40123",
                        address: "Carrera 24 # 100-200",
                        townId: 12.45,
                        blocked: false,
                        verified: true,
                        accountType: "NQ",
                        accountId: "40123",
                        vipState: true,
                        vipPubCount: 5,
                        reputation: 0.49
                    },
                    parent: null,
                    reactionsCount: {
                        LIKE: 5,
                        DISLIKE: 2,
                        WARNING: 5
                    }
                },
                {
                    id: "2214",
                    text: "No lo se Rick",
                    title: "Sospechoso",
                    createdAt: "1999-10-28 12:59:02",
                    user: {
                        id: "1234568",
                        firstName: "Edgar",
                        lastName: "Gonzalez",
                        email: "edgonzalezdi@unal.edu.co",
                        username: "Ola2",
                        createdAt: "1999-10-28 12:59:01",
                        birthDate: "2021-06-11",
                        idenIdType: "CC",
                        phone: "40123",
                        address: "Carrera 24 # 100-200",
                        townId: 12.45,
                        blocked: false,
                        verified: true,
                        accountType: "NQ",
                        accountId: "40123",
                        vipState: true,
                        vipPubCount: 5,
                        reputation: 0.75
                    },
                    parent: {
                        id: "2213",
                        text: "Me enkanta",
                        title: "No aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                            " aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        createdAt: "1999-10-28 12:59:01",
                    },
                    reactionsCount: {
                        LIKE: 5,
                        DISLIKE: 2,
                        WARNING: 5
                    }

                }
            ],
            supports: [
                {
                    id: "22312",
                    type: "VIDEO",
                    data: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
                    createdAt: "1999-10-28 12:59:01",
                    description: "Ola de marrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
                },
                {
                    id: "22313",
                    type: "IMAGE",
                    data: "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
                    createdAt: "1999-10-28 12:59:01",
                    description: "Ola de mar 2"
                },
                {
                    id: "22314",
                    type: "VIDEO",
                    data: "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
                    createdAt: "1999-10-28 12:59:01",
                    description: "Ola de TSUNAMI"
                }
            ],
            offers: [
                {
                    id: "34312",
                    user: {
                        id: "1234567",
                        firstName: "Edgar",
                        lastName: "Gonzalez",
                        email: "edgonzalezdi@unal.edu.co",
                        username: "Ola",
                        createdAt: "1999-10-28 12:59:01",
                        birthDate: "2021-06-11",
                        idenIdType: "CC",
                        phone: "40123",
                        address: "Carrera 24 # 100-200",
                        townId: 12.45,
                        blocked: false,
                        verified: true,
                        accountType: "NQ",
                        accountId: "40123",
                        vipState: true,
                        vipPubCount: 5,
                        reputation: 0.37
                    },
                    createdAt: "1999-10-28 12:59:01",
                    amount: 20010000,
                    available: false
                },
                {
                    id: "34313",
                    user: {
                        id: "1234567",
                        firstName: "Edgar",
                        lastName: "Gonzalez",
                        email: "edgonzalezdi@unal.edu.co",
                        username: "Ola",
                        createdAt: "1999-10-28 12:59:01",
                        birthDate: "2021-06-11",
                        idenIdType: "CC",
                        phone: "40123",
                        address: "Carrera 24 # 100-200",
                        townId: 12.45,
                        blocked: false,
                        verified: true,
                        accountType: "NQ",
                        accountId: "40123",
                        vipState: true,
                        vipPubCount: 5,
                        reputation: 0.52
                    },
                    createdAt: "1999-10-28 12:59:01",
                    amount: 160000,
                    available: false
                },
                {
                    id: "34314",
                    user: {
                        id: "1234567",
                        firstName: "Edgar",
                        lastName: "Gonzalez",
                        email: "edgonzalezdi@unal.edu.co",
                        username: "Ola",
                        createdAt: "1999-10-28 12:59:01",
                        birthDate: "2021-06-11",
                        idenIdType: "CC",
                        phone: "40123",
                        address: "Carrera 24 # 100-200",
                        townId: 12.45,
                        blocked: false,
                        verified: true,
                        accountType: "NQ",
                        accountId: "40123",
                        vipState: true,
                        vipPubCount: 5,
                        reputation: 0.99
                    },
                    createdAt: "1999-10-28 12:59:01",
                    amount: 152100,
                    available: false
                }
            ]
        }
    }
}