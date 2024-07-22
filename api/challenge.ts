export async function get(): Promise<{ message: string }> {
  return await { message: "Challenge accepted!" };
}

export async function post(
  body: any
): Promise<{ message: string; received: any }> {
  return await { message: "Challenge POST request accepted!", received: body };
}
