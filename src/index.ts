export type AnyRecordKey = string | number | symbol;
export type AnyRecord<K extends AnyRecordKey = AnyRecordKey> = Record<K, unknown>;

export type AssignedObject<
  T1 extends AnyRecord = AnyRecord,
  T2 extends AnyRecord = AnyRecord,
> = { 
  [K in keyof T1 | keyof T2]: K extends keyof T2 ? T2[K] : T1[K]
};

const assignArray = (arr1: unknown[], arr2: unknown[]) => {
  const rs: unknown[] = [];
  const length2 = arr2.length;
  const length = Math.max(arr1.length, length2);

  Array(length).forEach((_, index) => {
    const value1 = arr1[index];
    
    if (index < length2){
      const value2 = arr2[index];

      if (
        typeof value2 === 'object' 
        && typeof value1 === 'object' 
        && value2 !== null 
        && value1 !== null
      ){
        if (Array.isArray(value2)){
          if (Array.isArray(value1)){
            rs.push([ ...assignArray(value1, value2) ]);
          }
          else{
            rs.push(value2);
          }
        }
        else{
          rs.push({ ...assignObject(value1 as AnyRecord, value1 as AnyRecord) })
        }
      }
      else{
        rs.push(value2);
      }
    }
    else{
      rs.push(value1);
    }
  })

  return rs;
}

const assignObject = <T1 extends AnyRecord, T2 extends AnyRecord>(obj1: T1, obj2: T2) => {
  const rs: AnyRecord = {};
  const keys = [ 
    ...Object.keys(obj1), 
    ...Object.keys(obj2)
  ].filter((key, index, all) => all.indexOf(key) === index);

  keys.forEach(key => {
    const value1 = obj1[key as keyof typeof obj1];
    
    if (key in obj2){
      const value2 = obj2[key as keyof typeof obj2];

      if (
        typeof value2 === 'object'
        && typeof value1 === 'object' 
        && value2 !== null 
        && value1 !== null
      ){
        if (Array.isArray(value2)){
          if (Array.isArray(value1)){
            rs[key] = assignArray(value1, value2);
          }
          else{
            rs[key] = [ ...value2 ];
          }
        }
        else{
          rs[key] = { ...assignObject(value1 as AnyRecord, value2 as AnyRecord) };
        }
      }
      else{
        rs[key] = value2;
      }
    }
    else{
      rs[key] = value1;
    }
  })

  return rs as AssignedObject;
}