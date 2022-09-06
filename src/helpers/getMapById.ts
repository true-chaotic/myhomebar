export default function getMapById<T extends { id: string }>(collection: T[]) {
  return collection
    .reduce((result, item) => {
      result.set(item.id, item);

      return result;
    }, new Map<string, T>());
}
