import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    console.log("Obj is", obj);
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  fetchAutosuggestSuggestions = (value, options) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const suggestions =
      inputLength === 0
        ? []
        : options.filter(
            (option) =>
              option.toLowerCase().slice(0, inputLength) === inputValue
          );

    return suggestions;
  };

  handleAutosuggestSelection = (suggestionValue, name) => {
    const { data } = this.state;
    data[name] = suggestionValue;
    this.setState({ data });
  };

  handleChange = (event) => {
    this.handleErrors(event);
    this.handleData(event);
  };

  handleErrors = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  handleData = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderAutosuggest(name, label, options) {
    const { data } = this.state;

    const inputProps = {
      placeholder: label,
      value: data[name],
      onChange: this.handleData,
      name,
      id: "name",
    };

    const suggestions = this.fetchAutosuggestSuggestions(data[name], options);

    return (
      <Autosuggest
        inputProps={inputProps}
        onSuggestionSelected={(event, { suggestion }) => {
          // Handle the selected suggestion here
          console.log("Selected suggestion:", suggestion);
          this.handleAutosuggestSelection(suggestion, name);
        }}
        suggestions={suggestions}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        onSuggestionsFetchRequested={({ value }) =>
          this.fetchAutosuggestSuggestions(value, options)
        }
        highlightFirstSuggestion
        onSuggestionsClearRequested={() => {}}
        renderSuggestionsContainer={({ containerProps, children, query }) => (
          <div {...containerProps}>
            <ul className="suggestion-list">{children}</ul>
          </div>
        )}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderReadOnlyLinkComponent(title, text, link) {
    return (
      <div>
        {title} <br />
        <Link to={link}>{text}</Link>
      </div>
    );
  }

  renderURLReadOnlyList(
    list_title,
    items,
    display_parameter,
    url_prefix,
    remove_function = null
  ) {
    /*
      list_title: string to be displayed as title of the list
      items: array of objects to be displayed in the list
      display_parameter: string with the name of the parameter to search in the items list
      url_prefix: URL prefix to be used in the links
    */
    if (!items) return null;
    return (
      <div>
        {list_title}
        <ul>
          {items.map((item) => (
            <li key={item["id"]}>
              <Link to={`/${url_prefix}/${item["id"]}/`}>
                {item[display_parameter]}
              </Link>
              <span>&nbsp;&nbsp;</span>
              {remove_function && (
                <button
                  style={{ fontSize: 10 }}
                  onClick={() => remove_function(item)}
                  className="btn btn-danger btn-sm"
                >
                  X
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderInput(name, label, type = "text", enabled = false) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        readOnly={enabled}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
