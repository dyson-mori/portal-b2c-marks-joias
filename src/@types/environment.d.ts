declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_SECRET_KEY: string;
      NEXT_PUBLIC_URL: string;
    }
  }
}

export { }