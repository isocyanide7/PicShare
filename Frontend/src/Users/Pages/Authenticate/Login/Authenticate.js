import React, { useContext, useState } from "react";

import useForm from "../../../../Shared/Hooks/form-hook";
import Input from "../../../../Shared/Components/FormElements/Input/Input";
import Button from "../../../../Shared/Components/FormElements/Button/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../../Shared/Utils/Validators/Validators";
import Card from "../../../../Shared/Components/UIElements/Card/Card";

import "./Authenticate.css";
import AuthContext from "../../../../Shared/Context/auth-context";

const Authenticate = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        valid: false,
      },
      password: {
        value: "",
        valid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        false
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            valid: false,
          },
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    console.log(formState.inputs);
    setIsLoginMode((prevState) => !prevState);
  };

  const auth = useContext(AuthContext);

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
    
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>LOGIN REQUIRED</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a valid Name"
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          errorText="Please enter a valid Email Address."
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          onInput={inputHandler}
          errorText="Please enter a description with at least length 8."
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Authenticate;
