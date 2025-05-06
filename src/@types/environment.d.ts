declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_STRIPE_SECRET_KEY: string;
      NEXT_PUBLIC_MARKS_URL: string;
      NEXT_STRIPE_SECRET_KEY: string;
    }
  }
}

export { }