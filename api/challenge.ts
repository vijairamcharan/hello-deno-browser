export async function get(): Promise<{ message: string }> {
  return { message: "Challenge accepted!" };
}

export async function post(
  body: any
): Promise<{ message: string; received: any }> {
  return { message: "Challenge POST request accepted!", received: body };
}
