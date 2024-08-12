// src/composables/useUserForm.ts
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import userService from "../services/userService";
import type { Ref } from "vue";
import type { User } from "../services/userService";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  job: yup.string().required("Job is required"),
});

export function useUserForm(initialUser: User | null = null) {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: initialUser || { name: "", job: "" },
  });

  const { value: name, errorMessage: nameError } = useField<string>("name");
  const { value: job, errorMessage: jobError } = useField<string>("job");

  const submitForm = handleSubmit(async (values) => {
    loading.value = true;
    error.value = null;

    try {
      if (initialUser) {
        await userService.updateUser(initialUser.id, values);
      } else {
        await userService.createUser(values);
      }
      resetForm();
    } catch (err: any) {
      error.value = "An error occurred. Please try again.";
      console.error("Form submission error:", err);
    } finally {
      loading.value = false;
    }
  });

  return {
    name,
    job,
    nameError,
    jobError,
    error,
    loading,
    submitForm,
  };
}
