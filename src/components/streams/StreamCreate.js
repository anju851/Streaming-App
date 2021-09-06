import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
//Field is a component that gets rendered on the screen and reduxForm is
//a function that works exactly as the connect function from the redux library.
//It makes sure that it calls action creator and gets some form data into our component and all that happens automatically

import { Field, formValues, reduxForm } from "redux-form";
class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //this below function is to render content on the web page
  renderInput = ({ input, label, meta }) => {
    //console.log(formProps);
    //console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    //console.log(this.props);
    //Field is declared whenever we define any input
    //fields for the form and inside it we need to provide various props
    //needed for the input field, the name here doesn't resembles the label name of the input field rather its a name being provided to the 'Field'
    //Field is only responsible for hooking functionalities like action creators and mapStateToProps, it do not render fields on the page
    //In order to make "Field" render input fields on the page we need to pass it a prop - component
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form "
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate: validate, //can be condensed as only validate
})(StreamCreate);

export default connect(null, {
  createStream,
})(formWrapped);
