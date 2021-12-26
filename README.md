# Utilities for Object and Array

## Installation

```sh
npm i --save @kensoni/object
```

## Support type

```ts
type AnyRecordKey = string | number | symbol;
type AnyRecord<K extends AnyRecordKey = AnyRecordKey> = Record<K, unknown>;

type AssignedObject<T1 extends AnyRecord = AnyRecord, T2 extends AnyRecord = AnyRecord> = { 
  [K in keyof T1 | keyof T2]: K extends keyof T2 ? T2[K] : T1[K]
};
```

## Support functions

### assignArray()

```ts
assignArray(arr1: unknown[], arr2: unknown[]): unknown[];
```

### assignObject()

```ts
assignObject(obj1: AnyRecord, obj2: AnyRecord): AssignedObject;
```