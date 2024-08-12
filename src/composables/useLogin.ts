import { ref } from "vue";
import { useRouter } from "vue-router";
import authService from "../services/authService";
import type { Ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function useLogin() {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  const router = useRouter();

  const { handleSubmit } = useForm({
    validationSchema: schema,
  });

  const { value: email, errorMessage: emailError } = useField<string>("email");
  const { value: password, errorMessage: passwordError } =
    useField<string>("password");

  const login = handleSubmit(async (values) => {
    loading.value = true;
    error.value = null;

    try {
      await authService.login({
        email: values.email,
        password: values.password,
      });

      router.push("/dashboard/user");
    } catch (err: any) {
      if (err.response && err.response.data) {
        error.value = err.response.data.message;
      } else {
        error.value = "An error occurred. Please try again.";
      }
      console.error("Login error:", err);
    } finally {
      loading.value = false;
    }
  });

  return {
    email,
    password,
    emailError,
    passwordError,
    error,
    loading,
    login,
  };
}
