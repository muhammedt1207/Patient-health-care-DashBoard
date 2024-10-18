import React from "react";
import { Sun, Moon, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useTheme from "../../hooks/useTheme";
import { loginValidationSchema } from "../../validation/LoginValidation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/authActions";

const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Form values:", values);

      await dispatch(loginUser(values));
      setSubmitting(false);

      navigate("/doctor-dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitting(false);
    }
  };

  const handleNavigate = () => {
    navigate("/signup");
  };

  const CustomInput = ({
    field,
    form: { touched, errors },
    icon: Icon,
    ...props
  }) => {
    const hasError = touched[field.name] && errors[field.name];

    return (
      <div className="relative">
        <Icon
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } ${hasError ? "top-6" : ""}`}
        />
        <input
          {...field}
          {...props}
          className={`pl-10 w-full p-3 rounded-lg outline-none border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
              : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-600"
          } ${hasError ? "border-red-500" : ""}`}
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="absolute -bottom-6 left-0 text-red-500 text-sm"
        />
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-200 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg transition-colors duration-200 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome Back
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-700 text-yellow-400"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  component={CustomInput}
                  icon={Mail}
                  placeholder="name@example.com"
                  id="email"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  component={CustomInput}
                  icon={Lock}
                  placeholder="••••••••"
                  id="password"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  className={`text-sm ${
                    isDarkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-500"
                  }`}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <span
              onClick={handleNavigate}
              className={`cursor-pointer ml-2 font-medium ${
                isDarkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-500"
              }`}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
