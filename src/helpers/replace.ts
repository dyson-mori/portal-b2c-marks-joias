// T: original typing
// R: typing to replace

export type Replace<T, R> = Omit<T, keyof R> & R;