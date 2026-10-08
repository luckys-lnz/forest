/** One definition of "looks like an email", shared by every form and route. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (value: string | undefined): boolean => EMAIL.test(value?.trim() ?? "");

export const EMAIL_HINT = "Enter an email address like name@example.com.";
