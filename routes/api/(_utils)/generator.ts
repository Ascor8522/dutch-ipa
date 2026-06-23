export async function* promiseArrayToAsyncGenerator<T>(
  array: Promise<T>[],
): AsyncGenerator<T, void, never> {
  const wrapped = array.map((item, index) =>
    [
      index,
      item.then((value) => [index, value] as const),
    ] as const
  );
  const map = new Map(wrapped);

  while (map.size) {
    const [key, value] = await Promise.race(map.values());
    map.delete(key);
    yield value;
  }
}
