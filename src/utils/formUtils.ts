export const getChangedFields = <
  T extends Record<string, any>,
  U extends Record<string, any>,
>(
  currentData: T,
  initialData: U,
  fieldsToCompare?: (keyof T)[]
): Partial<T> => {
  const changedFields: Partial<T> = {};

  // 비교할 필드가 지정되지 않았다면 currentData의 모든 키를 사용
  const fieldsToCheck =
    fieldsToCompare || (Object.keys(currentData) as (keyof T)[]);

  fieldsToCheck.forEach((field) => {
    if (field in initialData) {
      const initialValue = initialData[field as keyof U];
      const currentValue = currentData[field];

      // 타입 안전을 위해 any 타입으로 변환하여 비교
      if (
        (initialValue as any) !== (currentValue as any) &&
        currentValue !== undefined
      ) {
        changedFields[field] = currentValue;
      }
    }
  });

  return changedFields;
};
