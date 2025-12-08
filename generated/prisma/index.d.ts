/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Account
 *
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model VerificationToken
 *
 */
export type VerificationToken =
  $Result.DefaultSelection<Prisma.$VerificationTokenPayload>;
/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Habit
 *
 */
export type Habit = $Result.DefaultSelection<Prisma.$HabitPayload>;
/**
 * Model HabitLog
 *
 */
export type HabitLog = $Result.DefaultSelection<Prisma.$HabitLogPayload>;
/**
 * Model Aspiration
 *
 */
export type Aspiration = $Result.DefaultSelection<Prisma.$AspirationPayload>;
/**
 * Model CelebrationMethod
 *
 */
export type CelebrationMethod =
  $Result.DefaultSelection<Prisma.$CelebrationMethodPayload>;
/**
 * Model UserCelebration
 *
 */
export type UserCelebration =
  $Result.DefaultSelection<Prisma.$UserCelebrationPayload>;
/**
 * Model DailyRoutine
 *
 */
export type DailyRoutine =
  $Result.DefaultSelection<Prisma.$DailyRoutinePayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const HabitType: {
    BUILD: "BUILD";
    BREAK: "BREAK";
  };

  export type HabitType = (typeof HabitType)[keyof typeof HabitType];

  export const HabitStatus: {
    ACTIVE: "ACTIVE";
    PAUSED: "PAUSED";
    GRADUATED: "GRADUATED";
    ARCHIVED: "ARCHIVED";
  };

  export type HabitStatus = (typeof HabitStatus)[keyof typeof HabitStatus];

  export const CompletionLevel: {
    MINIMUM: "MINIMUM";
    STANDARD: "STANDARD";
    EXCEEDED: "EXCEEDED";
  };

  export type CompletionLevel =
    (typeof CompletionLevel)[keyof typeof CompletionLevel];

  export const CelebrationCategory: {
    VERBAL: "VERBAL";
    PHYSICAL: "PHYSICAL";
    MENTAL: "MENTAL";
    SENSORY: "SENSORY";
  };

  export type CelebrationCategory =
    (typeof CelebrationCategory)[keyof typeof CelebrationCategory];

  export const AspirationStatus: {
    EXPLORING: "EXPLORING";
    ACTIVE: "ACTIVE";
    ACHIEVED: "ACHIEVED";
    ABANDONED: "ABANDONED";
  };

  export type AspirationStatus =
    (typeof AspirationStatus)[keyof typeof AspirationStatus];
}

export type HabitType = $Enums.HabitType;

export const HabitType: typeof $Enums.HabitType;

export type HabitStatus = $Enums.HabitStatus;

export const HabitStatus: typeof $Enums.HabitStatus;

export type CompletionLevel = $Enums.CompletionLevel;

export const CompletionLevel: typeof $Enums.CompletionLevel;

export type CelebrationCategory = $Enums.CelebrationCategory;

export const CelebrationCategory: typeof $Enums.CelebrationCategory;

export type AspirationStatus = $Enums.AspirationStatus;

export const AspirationStatus: typeof $Enums.AspirationStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more VerificationTokens
   * const verificationTokens = await prisma.verificationToken.findMany()
   * ```
   */
  get verificationToken(): Prisma.VerificationTokenDelegate<
    ExtArgs,
    ClientOptions
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.habit`: Exposes CRUD operations for the **Habit** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Habits
   * const habits = await prisma.habit.findMany()
   * ```
   */
  get habit(): Prisma.HabitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.habitLog`: Exposes CRUD operations for the **HabitLog** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more HabitLogs
   * const habitLogs = await prisma.habitLog.findMany()
   * ```
   */
  get habitLog(): Prisma.HabitLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aspiration`: Exposes CRUD operations for the **Aspiration** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Aspirations
   * const aspirations = await prisma.aspiration.findMany()
   * ```
   */
  get aspiration(): Prisma.AspirationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.celebrationMethod`: Exposes CRUD operations for the **CelebrationMethod** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CelebrationMethods
   * const celebrationMethods = await prisma.celebrationMethod.findMany()
   * ```
   */
  get celebrationMethod(): Prisma.CelebrationMethodDelegate<
    ExtArgs,
    ClientOptions
  >;

  /**
   * `prisma.userCelebration`: Exposes CRUD operations for the **UserCelebration** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more UserCelebrations
   * const userCelebrations = await prisma.userCelebration.findMany()
   * ```
   */
  get userCelebration(): Prisma.UserCelebrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyRoutine`: Exposes CRUD operations for the **DailyRoutine** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more DailyRoutines
   * const dailyRoutines = await prisma.dailyRoutine.findMany()
   * ```
   */
  get dailyRoutine(): Prisma.DailyRoutineDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Account: "Account";
    Session: "Session";
    VerificationToken: "VerificationToken";
    User: "User";
    Habit: "Habit";
    HabitLog: "HabitLog";
    Aspiration: "Aspiration";
    CelebrationMethod: "CelebrationMethod";
    UserCelebration: "UserCelebration";
    DailyRoutine: "DailyRoutine";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | "account"
        | "session"
        | "verificationToken"
        | "user"
        | "habit"
        | "habitLog"
        | "aspiration"
        | "celebrationMethod"
        | "userCelebration"
        | "dailyRoutine";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>;
        fields: Prisma.AccountFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAccount>;
          };
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AccountGroupByOutputType>[];
          };
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>;
            result: $Utils.Optional<AccountCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: $Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>;
        fields: Prisma.VerificationTokenFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateVerificationToken>;
          };
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>;
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[];
          };
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<VerificationTokenCountAggregateOutputType>
              | number;
          };
        };
      };
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Habit: {
        payload: Prisma.$HabitPayload<ExtArgs>;
        fields: Prisma.HabitFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.HabitFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.HabitFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>;
          };
          findFirst: {
            args: Prisma.HabitFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.HabitFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>;
          };
          findMany: {
            args: Prisma.HabitFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>[];
          };
          create: {
            args: Prisma.HabitCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>;
          };
          createMany: {
            args: Prisma.HabitCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.HabitCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>[];
          };
          delete: {
            args: Prisma.HabitDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>;
          };
          update: {
            args: Prisma.HabitUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>;
          };
          deleteMany: {
            args: Prisma.HabitDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.HabitUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.HabitUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>[];
          };
          upsert: {
            args: Prisma.HabitUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitPayload>;
          };
          aggregate: {
            args: Prisma.HabitAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateHabit>;
          };
          groupBy: {
            args: Prisma.HabitGroupByArgs<ExtArgs>;
            result: $Utils.Optional<HabitGroupByOutputType>[];
          };
          count: {
            args: Prisma.HabitCountArgs<ExtArgs>;
            result: $Utils.Optional<HabitCountAggregateOutputType> | number;
          };
        };
      };
      HabitLog: {
        payload: Prisma.$HabitLogPayload<ExtArgs>;
        fields: Prisma.HabitLogFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.HabitLogFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.HabitLogFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>;
          };
          findFirst: {
            args: Prisma.HabitLogFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.HabitLogFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>;
          };
          findMany: {
            args: Prisma.HabitLogFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>[];
          };
          create: {
            args: Prisma.HabitLogCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>;
          };
          createMany: {
            args: Prisma.HabitLogCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.HabitLogCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>[];
          };
          delete: {
            args: Prisma.HabitLogDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>;
          };
          update: {
            args: Prisma.HabitLogUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>;
          };
          deleteMany: {
            args: Prisma.HabitLogDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.HabitLogUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.HabitLogUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>[];
          };
          upsert: {
            args: Prisma.HabitLogUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HabitLogPayload>;
          };
          aggregate: {
            args: Prisma.HabitLogAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateHabitLog>;
          };
          groupBy: {
            args: Prisma.HabitLogGroupByArgs<ExtArgs>;
            result: $Utils.Optional<HabitLogGroupByOutputType>[];
          };
          count: {
            args: Prisma.HabitLogCountArgs<ExtArgs>;
            result: $Utils.Optional<HabitLogCountAggregateOutputType> | number;
          };
        };
      };
      Aspiration: {
        payload: Prisma.$AspirationPayload<ExtArgs>;
        fields: Prisma.AspirationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AspirationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AspirationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>;
          };
          findFirst: {
            args: Prisma.AspirationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AspirationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>;
          };
          findMany: {
            args: Prisma.AspirationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>[];
          };
          create: {
            args: Prisma.AspirationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>;
          };
          createMany: {
            args: Prisma.AspirationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AspirationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>[];
          };
          delete: {
            args: Prisma.AspirationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>;
          };
          update: {
            args: Prisma.AspirationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>;
          };
          deleteMany: {
            args: Prisma.AspirationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AspirationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AspirationUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>[];
          };
          upsert: {
            args: Prisma.AspirationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AspirationPayload>;
          };
          aggregate: {
            args: Prisma.AspirationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAspiration>;
          };
          groupBy: {
            args: Prisma.AspirationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AspirationGroupByOutputType>[];
          };
          count: {
            args: Prisma.AspirationCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<AspirationCountAggregateOutputType>
              | number;
          };
        };
      };
      CelebrationMethod: {
        payload: Prisma.$CelebrationMethodPayload<ExtArgs>;
        fields: Prisma.CelebrationMethodFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CelebrationMethodFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CelebrationMethodFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>;
          };
          findFirst: {
            args: Prisma.CelebrationMethodFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CelebrationMethodFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>;
          };
          findMany: {
            args: Prisma.CelebrationMethodFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>[];
          };
          create: {
            args: Prisma.CelebrationMethodCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>;
          };
          createMany: {
            args: Prisma.CelebrationMethodCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CelebrationMethodCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>[];
          };
          delete: {
            args: Prisma.CelebrationMethodDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>;
          };
          update: {
            args: Prisma.CelebrationMethodUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>;
          };
          deleteMany: {
            args: Prisma.CelebrationMethodDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CelebrationMethodUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.CelebrationMethodUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>[];
          };
          upsert: {
            args: Prisma.CelebrationMethodUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CelebrationMethodPayload>;
          };
          aggregate: {
            args: Prisma.CelebrationMethodAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCelebrationMethod>;
          };
          groupBy: {
            args: Prisma.CelebrationMethodGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CelebrationMethodGroupByOutputType>[];
          };
          count: {
            args: Prisma.CelebrationMethodCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<CelebrationMethodCountAggregateOutputType>
              | number;
          };
        };
      };
      UserCelebration: {
        payload: Prisma.$UserCelebrationPayload<ExtArgs>;
        fields: Prisma.UserCelebrationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserCelebrationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserCelebrationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>;
          };
          findFirst: {
            args: Prisma.UserCelebrationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserCelebrationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>;
          };
          findMany: {
            args: Prisma.UserCelebrationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>[];
          };
          create: {
            args: Prisma.UserCelebrationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>;
          };
          createMany: {
            args: Prisma.UserCelebrationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCelebrationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>[];
          };
          delete: {
            args: Prisma.UserCelebrationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>;
          };
          update: {
            args: Prisma.UserCelebrationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>;
          };
          deleteMany: {
            args: Prisma.UserCelebrationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserCelebrationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserCelebrationUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>[];
          };
          upsert: {
            args: Prisma.UserCelebrationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserCelebrationPayload>;
          };
          aggregate: {
            args: Prisma.UserCelebrationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUserCelebration>;
          };
          groupBy: {
            args: Prisma.UserCelebrationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserCelebrationGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCelebrationCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<UserCelebrationCountAggregateOutputType>
              | number;
          };
        };
      };
      DailyRoutine: {
        payload: Prisma.$DailyRoutinePayload<ExtArgs>;
        fields: Prisma.DailyRoutineFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.DailyRoutineFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.DailyRoutineFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>;
          };
          findFirst: {
            args: Prisma.DailyRoutineFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.DailyRoutineFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>;
          };
          findMany: {
            args: Prisma.DailyRoutineFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>[];
          };
          create: {
            args: Prisma.DailyRoutineCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>;
          };
          createMany: {
            args: Prisma.DailyRoutineCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.DailyRoutineCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>[];
          };
          delete: {
            args: Prisma.DailyRoutineDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>;
          };
          update: {
            args: Prisma.DailyRoutineUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>;
          };
          deleteMany: {
            args: Prisma.DailyRoutineDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.DailyRoutineUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.DailyRoutineUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>[];
          };
          upsert: {
            args: Prisma.DailyRoutineUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DailyRoutinePayload>;
          };
          aggregate: {
            args: Prisma.DailyRoutineAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDailyRoutine>;
          };
          groupBy: {
            args: Prisma.DailyRoutineGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DailyRoutineGroupByOutputType>[];
          };
          count: {
            args: Prisma.DailyRoutineCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<DailyRoutineCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    account?: AccountOmit;
    session?: SessionOmit;
    verificationToken?: VerificationTokenOmit;
    user?: UserOmit;
    habit?: HabitOmit;
    habitLog?: HabitLogOmit;
    aspiration?: AspirationOmit;
    celebrationMethod?: CelebrationMethodOmit;
    userCelebration?: UserCelebrationOmit;
    dailyRoutine?: DailyRoutineOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T["level"] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number;
    sessions: number;
    aspirations: number;
    habits: number;
    habitLogs: number;
    celebrations: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    aspirations?: boolean | UserCountOutputTypeCountAspirationsArgs;
    habits?: boolean | UserCountOutputTypeCountHabitsArgs;
    habitLogs?: boolean | UserCountOutputTypeCountHabitLogsArgs;
    celebrations?: boolean | UserCountOutputTypeCountCelebrationsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAspirationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AspirationWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHabitsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HabitWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHabitLogsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HabitLogWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCelebrationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserCelebrationWhereInput;
  };

  /**
   * Count Type HabitCountOutputType
   */

  export type HabitCountOutputType = {
    logs: number;
  };

  export type HabitCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    logs?: boolean | HabitCountOutputTypeCountLogsArgs;
  };

  // Custom InputTypes
  /**
   * HabitCountOutputType without action
   */
  export type HabitCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitCountOutputType
     */
    select?: HabitCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * HabitCountOutputType without action
   */
  export type HabitCountOutputTypeCountLogsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HabitLogWhereInput;
  };

  /**
   * Count Type AspirationCountOutputType
   */

  export type AspirationCountOutputType = {
    habits: number;
  };

  export type AspirationCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    habits?: boolean | AspirationCountOutputTypeCountHabitsArgs;
  };

  // Custom InputTypes
  /**
   * AspirationCountOutputType without action
   */
  export type AspirationCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AspirationCountOutputType
     */
    select?: AspirationCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * AspirationCountOutputType without action
   */
  export type AspirationCountOutputTypeCountHabitsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HabitWhereInput;
  };

  /**
   * Count Type CelebrationMethodCountOutputType
   */

  export type CelebrationMethodCountOutputType = {
    userFavorites: number;
  };

  export type CelebrationMethodCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    userFavorites?:
      | boolean
      | CelebrationMethodCountOutputTypeCountUserFavoritesArgs;
  };

  // Custom InputTypes
  /**
   * CelebrationMethodCountOutputType without action
   */
  export type CelebrationMethodCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethodCountOutputType
     */
    select?: CelebrationMethodCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CelebrationMethodCountOutputType without action
   */
  export type CelebrationMethodCountOutputTypeCountUserFavoritesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserCelebrationWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null;
    refresh_token_expires_in: number | null;
  };

  export type AccountSumAggregateOutputType = {
    expires_at: number | null;
    refresh_token_expires_in: number | null;
  };

  export type AccountMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    refresh_token_expires_in: number | null;
  };

  export type AccountMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    refresh_token_expires_in: number | null;
  };

  export type AccountCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    provider: number;
    providerAccountId: number;
    refresh_token: number;
    access_token: number;
    expires_at: number;
    token_type: number;
    scope: number;
    id_token: number;
    session_state: number;
    refresh_token_expires_in: number;
    _all: number;
  };

  export type AccountAvgAggregateInputType = {
    expires_at?: true;
    refresh_token_expires_in?: true;
  };

  export type AccountSumAggregateInputType = {
    expires_at?: true;
    refresh_token_expires_in?: true;
  };

  export type AccountMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    refresh_token_expires_in?: true;
  };

  export type AccountMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    refresh_token_expires_in?: true;
  };

  export type AccountCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    refresh_token_expires_in?: true;
    _all?: true;
  };

  export type AccountAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Accounts
     **/
    _count?: true | AccountCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AccountAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AccountSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AccountMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AccountMaxAggregateInputType;
  };

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>;
  };

  export type AccountGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithAggregationInput
      | AccountOrderByWithAggregationInput[];
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum;
    having?: AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _avg?: AccountAvgAggregateInputType;
    _sum?: AccountSumAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
  };

  export type AccountGroupByOutputType = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    refresh_token_expires_in: number | null;
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AccountGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof AccountGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>;
        }
      >
    >;

  export type AccountSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      refresh_token_expires_in?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["account"]
  >;

  export type AccountSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      refresh_token_expires_in?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["account"]
  >;

  export type AccountSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      refresh_token_expires_in?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["account"]
  >;

  export type AccountSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    refresh_token?: boolean;
    access_token?: boolean;
    expires_at?: boolean;
    token_type?: boolean;
    scope?: boolean;
    id_token?: boolean;
    session_state?: boolean;
    refresh_token_expires_in?: boolean;
  };

  export type AccountOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "userId"
    | "type"
    | "provider"
    | "providerAccountId"
    | "refresh_token"
    | "access_token"
    | "expires_at"
    | "token_type"
    | "scope"
    | "id_token"
    | "session_state"
    | "refresh_token_expires_in",
    ExtArgs["result"]["account"]
  >;
  export type AccountInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AccountPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Account";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        type: string;
        provider: string;
        providerAccountId: string;
        refresh_token: string | null;
        access_token: string | null;
        expires_at: number | null;
        token_type: string | null;
        scope: string | null;
        id_token: string | null;
        session_state: string | null;
        refresh_token_expires_in: number | null;
      },
      ExtArgs["result"]["account"]
    >;
    composites: {};
  };

  type AccountGetPayload<
    S extends boolean | null | undefined | AccountDefaultArgs,
  > = $Result.GetResult<Prisma.$AccountPayload, S>;

  type AccountCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AccountFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: AccountCountAggregateInputType | true;
  };

  export interface AccountDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Account"];
      meta: { name: "Account" };
    };
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     *
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     *
     */
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     *
     */
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
     **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AccountCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AccountAggregateArgs>(
      args: Subset<T, AccountAggregateArgs>,
    ): Prisma.PrismaPromise<GetAccountAggregateType<T>>;

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs["orderBy"] }
        : { orderBy?: AccountGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetAccountGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Account model
     */
    readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", "String">;
    readonly userId: FieldRef<"Account", "String">;
    readonly type: FieldRef<"Account", "String">;
    readonly provider: FieldRef<"Account", "String">;
    readonly providerAccountId: FieldRef<"Account", "String">;
    readonly refresh_token: FieldRef<"Account", "String">;
    readonly access_token: FieldRef<"Account", "String">;
    readonly expires_at: FieldRef<"Account", "Int">;
    readonly token_type: FieldRef<"Account", "String">;
    readonly scope: FieldRef<"Account", "String">;
    readonly id_token: FieldRef<"Account", "String">;
    readonly session_state: FieldRef<"Account", "String">;
    readonly refresh_token_expires_in: FieldRef<"Account", "Int">;
  }

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account create
   */
  export type AccountCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
  };

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account update
   */
  export type AccountUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
  };

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput;
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
  };

  /**
   * Account delete
   */
  export type AccountDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number;
  };

  /**
   * Account without action
   */
  export type AccountDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
  };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    id: string | null;
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    id: string | null;
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    id: number;
    sessionToken: number;
    userId: number;
    expires: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
  };

  export type SessionMaxAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
  };

  export type SessionCountAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithAggregationInput
      | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SessionGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof SessionGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>;
        }
      >
    >;

  export type SessionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectScalar = {
    id?: boolean;
    sessionToken?: boolean;
    userId?: boolean;
    expires?: boolean;
  };

  export type SessionOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "sessionToken" | "userId" | "expires",
    ExtArgs["result"]["session"]
  >;
  export type SessionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Session";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        sessionToken: string;
        userId: string;
        expires: Date;
      },
      ExtArgs["result"]["session"]
    >;
    composites: {};
  };

  type SessionGetPayload<
    S extends boolean | null | undefined | SessionDefaultArgs,
  > = $Result.GetResult<Prisma.$SessionPayload, S>;

  type SessionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<SessionFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Session"];
      meta: { name: "Session" };
    };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs["orderBy"] }
        : { orderBy?: SessionGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetSessionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", "String">;
    readonly sessionToken: FieldRef<"Session", "String">;
    readonly userId: FieldRef<"Session", "String">;
    readonly expires: FieldRef<"Session", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
  };

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
  };

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
  };

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number;
    token: number;
    expires: number;
    _all: number;
  };

  export type VerificationTokenMinAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
  };

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
  };

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
    _all?: true;
  };

  export type VerificationTokenAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VerificationTokens
     **/
    _count?: true | VerificationTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: VerificationTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type GetVerificationTokenAggregateType<
    T extends VerificationTokenAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateVerificationToken]: P extends
      | "_count"
      | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>;
  };

  export type VerificationTokenGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: VerificationTokenWhereInput;
    orderBy?:
      | VerificationTokenOrderByWithAggregationInput
      | VerificationTokenOrderByWithAggregationInput[];
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum;
    having?: VerificationTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationTokenCountAggregateInputType | true;
    _min?: VerificationTokenMinAggregateInputType;
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type VerificationTokenGroupByOutputType = {
    identifier: string;
    token: string;
    expires: Date;
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  type GetVerificationTokenGroupByPayload<
    T extends VerificationTokenGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T["by"]> & {
        [P in keyof T &
          keyof VerificationTokenGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
          : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>;
      }
    >
  >;

  export type VerificationTokenSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs["result"]["verificationToken"]
  >;

  export type VerificationTokenSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs["result"]["verificationToken"]
  >;

  export type VerificationTokenSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs["result"]["verificationToken"]
  >;

  export type VerificationTokenSelectScalar = {
    identifier?: boolean;
    token?: boolean;
    expires?: boolean;
  };

  export type VerificationTokenOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "identifier" | "token" | "expires",
    ExtArgs["result"]["verificationToken"]
  >;

  export type $VerificationTokenPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "VerificationToken";
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        identifier: string;
        token: string;
        expires: Date;
      },
      ExtArgs["result"]["verificationToken"]
    >;
    composites: {};
  };

  type VerificationTokenGetPayload<
    S extends boolean | null | undefined | VerificationTokenDefaultArgs,
  > = $Result.GetResult<Prisma.$VerificationTokenPayload, S>;

  type VerificationTokenCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    VerificationTokenFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: VerificationTokenCountAggregateInputType | true;
  };

  export interface VerificationTokenDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["VerificationToken"];
      meta: { name: "VerificationToken" };
    };
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     *
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     *
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     *
     */
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     *
     */
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     *
     */
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
     **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<
              T["select"],
              VerificationTokenCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends VerificationTokenAggregateArgs>(
      args: Subset<T, VerificationTokenAggregateArgs>,
    ): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>;

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs["orderBy"] }
        : { orderBy?: VerificationTokenGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetVerificationTokenGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VerificationToken model
     */
    readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", "String">;
    readonly token: FieldRef<"VerificationToken", "String">;
    readonly expires: FieldRef<"VerificationToken", "DateTime">;
  }

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
  };

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<
      VerificationTokenUpdateManyMutationInput,
      VerificationTokenUncheckedUpdateManyInput
    >;
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput;
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number;
  };

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<
      VerificationTokenUpdateManyMutationInput,
      VerificationTokenUncheckedUpdateManyInput
    >;
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput;
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number;
  };

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput;
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
  };

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput;
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number;
  };

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
  };

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    emailVerified: number;
    image: number;
    preferences: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    emailVerified?: true;
    image?: true;
    preferences?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    preferences: JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      preferences?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      accounts?: boolean | User$accountsArgs<ExtArgs>;
      sessions?: boolean | User$sessionsArgs<ExtArgs>;
      aspirations?: boolean | User$aspirationsArgs<ExtArgs>;
      habits?: boolean | User$habitsArgs<ExtArgs>;
      habitLogs?: boolean | User$habitLogsArgs<ExtArgs>;
      routine?: boolean | User$routineArgs<ExtArgs>;
      celebrations?: boolean | User$celebrationsArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      preferences?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      preferences?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    preferences?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "name"
    | "email"
    | "emailVerified"
    | "image"
    | "preferences"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["user"]
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    accounts?: boolean | User$accountsArgs<ExtArgs>;
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    aspirations?: boolean | User$aspirationsArgs<ExtArgs>;
    habits?: boolean | User$habitsArgs<ExtArgs>;
    habitLogs?: boolean | User$habitLogsArgs<ExtArgs>;
    routine?: boolean | User$routineArgs<ExtArgs>;
    celebrations?: boolean | User$celebrationsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[];
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      aspirations: Prisma.$AspirationPayload<ExtArgs>[];
      habits: Prisma.$HabitPayload<ExtArgs>[];
      habitLogs: Prisma.$HabitLogPayload<ExtArgs>[];
      routine: Prisma.$DailyRoutinePayload<ExtArgs> | null;
      celebrations: Prisma.$UserCelebrationPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        preferences: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$accountsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AccountPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$SessionPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    aspirations<T extends User$aspirationsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$aspirationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AspirationPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    habits<T extends User$habitsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$habitsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$HabitPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    habitLogs<T extends User$habitLogsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$habitLogsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$HabitLogPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    routine<T extends User$routineArgs<ExtArgs> = {}>(
      args?: Subset<T, User$routineArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    celebrations<T extends User$celebrationsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$celebrationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$UserCelebrationPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly name: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly emailVerified: FieldRef<"User", "DateTime">;
    readonly image: FieldRef<"User", "String">;
    readonly preferences: FieldRef<"User", "Json">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.accounts
   */
  export type User$accountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    cursor?: AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * User.sessions
   */
  export type User$sessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User.aspirations
   */
  export type User$aspirationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    where?: AspirationWhereInput;
    orderBy?:
      | AspirationOrderByWithRelationInput
      | AspirationOrderByWithRelationInput[];
    cursor?: AspirationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AspirationScalarFieldEnum | AspirationScalarFieldEnum[];
  };

  /**
   * User.habits
   */
  export type User$habitsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    where?: HabitWhereInput;
    orderBy?: HabitOrderByWithRelationInput | HabitOrderByWithRelationInput[];
    cursor?: HabitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: HabitScalarFieldEnum | HabitScalarFieldEnum[];
  };

  /**
   * User.habitLogs
   */
  export type User$habitLogsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    where?: HabitLogWhereInput;
    orderBy?:
      | HabitLogOrderByWithRelationInput
      | HabitLogOrderByWithRelationInput[];
    cursor?: HabitLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: HabitLogScalarFieldEnum | HabitLogScalarFieldEnum[];
  };

  /**
   * User.routine
   */
  export type User$routineArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    where?: DailyRoutineWhereInput;
  };

  /**
   * User.celebrations
   */
  export type User$celebrationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    where?: UserCelebrationWhereInput;
    orderBy?:
      | UserCelebrationOrderByWithRelationInput
      | UserCelebrationOrderByWithRelationInput[];
    cursor?: UserCelebrationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | UserCelebrationScalarFieldEnum
      | UserCelebrationScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Habit
   */

  export type AggregateHabit = {
    _count: HabitCountAggregateOutputType | null;
    _avg: HabitAvgAggregateOutputType | null;
    _sum: HabitSumAggregateOutputType | null;
    _min: HabitMinAggregateOutputType | null;
    _max: HabitMaxAggregateOutputType | null;
  };

  export type HabitAvgAggregateOutputType = {
    currentPhase: number | null;
  };

  export type HabitSumAggregateOutputType = {
    currentPhase: number | null;
  };

  export type HabitMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.HabitType | null;
    name: string | null;
    description: string | null;
    category: string | null;
    anchor: string | null;
    behavior: string | null;
    celebration: string | null;
    aspirationId: string | null;
    currentPhase: number | null;
    status: $Enums.HabitStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type HabitMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.HabitType | null;
    name: string | null;
    description: string | null;
    category: string | null;
    anchor: string | null;
    behavior: string | null;
    celebration: string | null;
    aspirationId: string | null;
    currentPhase: number | null;
    status: $Enums.HabitStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type HabitCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    name: number;
    description: number;
    category: number;
    anchor: number;
    behavior: number;
    celebration: number;
    aspirationId: number;
    currentPhase: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type HabitAvgAggregateInputType = {
    currentPhase?: true;
  };

  export type HabitSumAggregateInputType = {
    currentPhase?: true;
  };

  export type HabitMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    name?: true;
    description?: true;
    category?: true;
    anchor?: true;
    behavior?: true;
    celebration?: true;
    aspirationId?: true;
    currentPhase?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type HabitMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    name?: true;
    description?: true;
    category?: true;
    anchor?: true;
    behavior?: true;
    celebration?: true;
    aspirationId?: true;
    currentPhase?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type HabitCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    name?: true;
    description?: true;
    category?: true;
    anchor?: true;
    behavior?: true;
    celebration?: true;
    aspirationId?: true;
    currentPhase?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type HabitAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Habit to aggregate.
     */
    where?: HabitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Habits to fetch.
     */
    orderBy?: HabitOrderByWithRelationInput | HabitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: HabitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Habits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Habits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Habits
     **/
    _count?: true | HabitCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: HabitAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: HabitSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: HabitMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: HabitMaxAggregateInputType;
  };

  export type GetHabitAggregateType<T extends HabitAggregateArgs> = {
    [P in keyof T & keyof AggregateHabit]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHabit[P]>
      : GetScalarType<T[P], AggregateHabit[P]>;
  };

  export type HabitGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HabitWhereInput;
    orderBy?:
      | HabitOrderByWithAggregationInput
      | HabitOrderByWithAggregationInput[];
    by: HabitScalarFieldEnum[] | HabitScalarFieldEnum;
    having?: HabitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HabitCountAggregateInputType | true;
    _avg?: HabitAvgAggregateInputType;
    _sum?: HabitSumAggregateInputType;
    _min?: HabitMinAggregateInputType;
    _max?: HabitMaxAggregateInputType;
  };

  export type HabitGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.HabitType;
    name: string;
    description: string | null;
    category: string | null;
    anchor: string | null;
    behavior: string | null;
    celebration: string | null;
    aspirationId: string | null;
    currentPhase: number;
    status: $Enums.HabitStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: HabitCountAggregateOutputType | null;
    _avg: HabitAvgAggregateOutputType | null;
    _sum: HabitSumAggregateOutputType | null;
    _min: HabitMinAggregateOutputType | null;
    _max: HabitMaxAggregateOutputType | null;
  };

  type GetHabitGroupByPayload<T extends HabitGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<HabitGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof HabitGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HabitGroupByOutputType[P]>
            : GetScalarType<T[P], HabitGroupByOutputType[P]>;
        }
      >
    >;

  export type HabitSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      name?: boolean;
      description?: boolean;
      category?: boolean;
      anchor?: boolean;
      behavior?: boolean;
      celebration?: boolean;
      aspirationId?: boolean;
      currentPhase?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      aspiration?: boolean | Habit$aspirationArgs<ExtArgs>;
      logs?: boolean | Habit$logsArgs<ExtArgs>;
      _count?: boolean | HabitCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["habit"]
  >;

  export type HabitSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      name?: boolean;
      description?: boolean;
      category?: boolean;
      anchor?: boolean;
      behavior?: boolean;
      celebration?: boolean;
      aspirationId?: boolean;
      currentPhase?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      aspiration?: boolean | Habit$aspirationArgs<ExtArgs>;
    },
    ExtArgs["result"]["habit"]
  >;

  export type HabitSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      name?: boolean;
      description?: boolean;
      category?: boolean;
      anchor?: boolean;
      behavior?: boolean;
      celebration?: boolean;
      aspirationId?: boolean;
      currentPhase?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      aspiration?: boolean | Habit$aspirationArgs<ExtArgs>;
    },
    ExtArgs["result"]["habit"]
  >;

  export type HabitSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    anchor?: boolean;
    behavior?: boolean;
    celebration?: boolean;
    aspirationId?: boolean;
    currentPhase?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type HabitOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "userId"
    | "type"
    | "name"
    | "description"
    | "category"
    | "anchor"
    | "behavior"
    | "celebration"
    | "aspirationId"
    | "currentPhase"
    | "status"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["habit"]
  >;
  export type HabitInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    aspiration?: boolean | Habit$aspirationArgs<ExtArgs>;
    logs?: boolean | Habit$logsArgs<ExtArgs>;
    _count?: boolean | HabitCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type HabitIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    aspiration?: boolean | Habit$aspirationArgs<ExtArgs>;
  };
  export type HabitIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    aspiration?: boolean | Habit$aspirationArgs<ExtArgs>;
  };

  export type $HabitPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Habit";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      aspiration: Prisma.$AspirationPayload<ExtArgs> | null;
      logs: Prisma.$HabitLogPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        type: $Enums.HabitType;
        name: string;
        description: string | null;
        category: string | null;
        anchor: string | null;
        behavior: string | null;
        celebration: string | null;
        aspirationId: string | null;
        currentPhase: number;
        status: $Enums.HabitStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["habit"]
    >;
    composites: {};
  };

  type HabitGetPayload<
    S extends boolean | null | undefined | HabitDefaultArgs,
  > = $Result.GetResult<Prisma.$HabitPayload, S>;

  type HabitCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<HabitFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: HabitCountAggregateInputType | true;
  };

  export interface HabitDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Habit"];
      meta: { name: "Habit" };
    };
    /**
     * Find zero or one Habit that matches the filter.
     * @param {HabitFindUniqueArgs} args - Arguments to find a Habit
     * @example
     * // Get one Habit
     * const habit = await prisma.habit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HabitFindUniqueArgs>(
      args: SelectSubset<T, HabitFindUniqueArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Habit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HabitFindUniqueOrThrowArgs} args - Arguments to find a Habit
     * @example
     * // Get one Habit
     * const habit = await prisma.habit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HabitFindUniqueOrThrowArgs>(
      args: SelectSubset<T, HabitFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Habit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitFindFirstArgs} args - Arguments to find a Habit
     * @example
     * // Get one Habit
     * const habit = await prisma.habit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HabitFindFirstArgs>(
      args?: SelectSubset<T, HabitFindFirstArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Habit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitFindFirstOrThrowArgs} args - Arguments to find a Habit
     * @example
     * // Get one Habit
     * const habit = await prisma.habit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HabitFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HabitFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Habits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Habits
     * const habits = await prisma.habit.findMany()
     *
     * // Get first 10 Habits
     * const habits = await prisma.habit.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const habitWithIdOnly = await prisma.habit.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HabitFindManyArgs>(
      args?: SelectSubset<T, HabitFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Habit.
     * @param {HabitCreateArgs} args - Arguments to create a Habit.
     * @example
     * // Create one Habit
     * const Habit = await prisma.habit.create({
     *   data: {
     *     // ... data to create a Habit
     *   }
     * })
     *
     */
    create<T extends HabitCreateArgs>(
      args: SelectSubset<T, HabitCreateArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Habits.
     * @param {HabitCreateManyArgs} args - Arguments to create many Habits.
     * @example
     * // Create many Habits
     * const habit = await prisma.habit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HabitCreateManyArgs>(
      args?: SelectSubset<T, HabitCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Habits and returns the data saved in the database.
     * @param {HabitCreateManyAndReturnArgs} args - Arguments to create many Habits.
     * @example
     * // Create many Habits
     * const habit = await prisma.habit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Habits and only return the `id`
     * const habitWithIdOnly = await prisma.habit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HabitCreateManyAndReturnArgs>(
      args?: SelectSubset<T, HabitCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Habit.
     * @param {HabitDeleteArgs} args - Arguments to delete one Habit.
     * @example
     * // Delete one Habit
     * const Habit = await prisma.habit.delete({
     *   where: {
     *     // ... filter to delete one Habit
     *   }
     * })
     *
     */
    delete<T extends HabitDeleteArgs>(
      args: SelectSubset<T, HabitDeleteArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Habit.
     * @param {HabitUpdateArgs} args - Arguments to update one Habit.
     * @example
     * // Update one Habit
     * const habit = await prisma.habit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HabitUpdateArgs>(
      args: SelectSubset<T, HabitUpdateArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Habits.
     * @param {HabitDeleteManyArgs} args - Arguments to filter Habits to delete.
     * @example
     * // Delete a few Habits
     * const { count } = await prisma.habit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HabitDeleteManyArgs>(
      args?: SelectSubset<T, HabitDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Habits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Habits
     * const habit = await prisma.habit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HabitUpdateManyArgs>(
      args: SelectSubset<T, HabitUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Habits and returns the data updated in the database.
     * @param {HabitUpdateManyAndReturnArgs} args - Arguments to update many Habits.
     * @example
     * // Update many Habits
     * const habit = await prisma.habit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Habits and only return the `id`
     * const habitWithIdOnly = await prisma.habit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends HabitUpdateManyAndReturnArgs>(
      args: SelectSubset<T, HabitUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Habit.
     * @param {HabitUpsertArgs} args - Arguments to update or create a Habit.
     * @example
     * // Update or create a Habit
     * const habit = await prisma.habit.upsert({
     *   create: {
     *     // ... data to create a Habit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Habit we want to update
     *   }
     * })
     */
    upsert<T extends HabitUpsertArgs>(
      args: SelectSubset<T, HabitUpsertArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      $Result.GetResult<
        Prisma.$HabitPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Habits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitCountArgs} args - Arguments to filter Habits to count.
     * @example
     * // Count the number of Habits
     * const count = await prisma.habit.count({
     *   where: {
     *     // ... the filter for the Habits we want to count
     *   }
     * })
     **/
    count<T extends HabitCountArgs>(
      args?: Subset<T, HabitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], HabitCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Habit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends HabitAggregateArgs>(
      args: Subset<T, HabitAggregateArgs>,
    ): Prisma.PrismaPromise<GetHabitAggregateType<T>>;

    /**
     * Group by Habit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends HabitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HabitGroupByArgs["orderBy"] }
        : { orderBy?: HabitGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, HabitGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetHabitGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Habit model
     */
    readonly fields: HabitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Habit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HabitClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    aspiration<T extends Habit$aspirationArgs<ExtArgs> = {}>(
      args?: Subset<T, Habit$aspirationArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    logs<T extends Habit$logsArgs<ExtArgs> = {}>(
      args?: Subset<T, Habit$logsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$HabitLogPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Habit model
   */
  interface HabitFieldRefs {
    readonly id: FieldRef<"Habit", "String">;
    readonly userId: FieldRef<"Habit", "String">;
    readonly type: FieldRef<"Habit", "HabitType">;
    readonly name: FieldRef<"Habit", "String">;
    readonly description: FieldRef<"Habit", "String">;
    readonly category: FieldRef<"Habit", "String">;
    readonly anchor: FieldRef<"Habit", "String">;
    readonly behavior: FieldRef<"Habit", "String">;
    readonly celebration: FieldRef<"Habit", "String">;
    readonly aspirationId: FieldRef<"Habit", "String">;
    readonly currentPhase: FieldRef<"Habit", "Int">;
    readonly status: FieldRef<"Habit", "HabitStatus">;
    readonly createdAt: FieldRef<"Habit", "DateTime">;
    readonly updatedAt: FieldRef<"Habit", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Habit findUnique
   */
  export type HabitFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * Filter, which Habit to fetch.
     */
    where: HabitWhereUniqueInput;
  };

  /**
   * Habit findUniqueOrThrow
   */
  export type HabitFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * Filter, which Habit to fetch.
     */
    where: HabitWhereUniqueInput;
  };

  /**
   * Habit findFirst
   */
  export type HabitFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * Filter, which Habit to fetch.
     */
    where?: HabitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Habits to fetch.
     */
    orderBy?: HabitOrderByWithRelationInput | HabitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Habits.
     */
    cursor?: HabitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Habits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Habits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Habits.
     */
    distinct?: HabitScalarFieldEnum | HabitScalarFieldEnum[];
  };

  /**
   * Habit findFirstOrThrow
   */
  export type HabitFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * Filter, which Habit to fetch.
     */
    where?: HabitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Habits to fetch.
     */
    orderBy?: HabitOrderByWithRelationInput | HabitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Habits.
     */
    cursor?: HabitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Habits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Habits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Habits.
     */
    distinct?: HabitScalarFieldEnum | HabitScalarFieldEnum[];
  };

  /**
   * Habit findMany
   */
  export type HabitFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * Filter, which Habits to fetch.
     */
    where?: HabitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Habits to fetch.
     */
    orderBy?: HabitOrderByWithRelationInput | HabitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Habits.
     */
    cursor?: HabitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Habits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Habits.
     */
    skip?: number;
    distinct?: HabitScalarFieldEnum | HabitScalarFieldEnum[];
  };

  /**
   * Habit create
   */
  export type HabitCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * The data needed to create a Habit.
     */
    data: XOR<HabitCreateInput, HabitUncheckedCreateInput>;
  };

  /**
   * Habit createMany
   */
  export type HabitCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Habits.
     */
    data: HabitCreateManyInput | HabitCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Habit createManyAndReturn
   */
  export type HabitCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * The data used to create many Habits.
     */
    data: HabitCreateManyInput | HabitCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Habit update
   */
  export type HabitUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * The data needed to update a Habit.
     */
    data: XOR<HabitUpdateInput, HabitUncheckedUpdateInput>;
    /**
     * Choose, which Habit to update.
     */
    where: HabitWhereUniqueInput;
  };

  /**
   * Habit updateMany
   */
  export type HabitUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Habits.
     */
    data: XOR<HabitUpdateManyMutationInput, HabitUncheckedUpdateManyInput>;
    /**
     * Filter which Habits to update
     */
    where?: HabitWhereInput;
    /**
     * Limit how many Habits to update.
     */
    limit?: number;
  };

  /**
   * Habit updateManyAndReturn
   */
  export type HabitUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * The data used to update Habits.
     */
    data: XOR<HabitUpdateManyMutationInput, HabitUncheckedUpdateManyInput>;
    /**
     * Filter which Habits to update
     */
    where?: HabitWhereInput;
    /**
     * Limit how many Habits to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Habit upsert
   */
  export type HabitUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * The filter to search for the Habit to update in case it exists.
     */
    where: HabitWhereUniqueInput;
    /**
     * In case the Habit found by the `where` argument doesn't exist, create a new Habit with this data.
     */
    create: XOR<HabitCreateInput, HabitUncheckedCreateInput>;
    /**
     * In case the Habit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HabitUpdateInput, HabitUncheckedUpdateInput>;
  };

  /**
   * Habit delete
   */
  export type HabitDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    /**
     * Filter which Habit to delete.
     */
    where: HabitWhereUniqueInput;
  };

  /**
   * Habit deleteMany
   */
  export type HabitDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Habits to delete
     */
    where?: HabitWhereInput;
    /**
     * Limit how many Habits to delete.
     */
    limit?: number;
  };

  /**
   * Habit.aspiration
   */
  export type Habit$aspirationArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    where?: AspirationWhereInput;
  };

  /**
   * Habit.logs
   */
  export type Habit$logsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    where?: HabitLogWhereInput;
    orderBy?:
      | HabitLogOrderByWithRelationInput
      | HabitLogOrderByWithRelationInput[];
    cursor?: HabitLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: HabitLogScalarFieldEnum | HabitLogScalarFieldEnum[];
  };

  /**
   * Habit without action
   */
  export type HabitDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
  };

  /**
   * Model HabitLog
   */

  export type AggregateHabitLog = {
    _count: HabitLogCountAggregateOutputType | null;
    _avg: HabitLogAvgAggregateOutputType | null;
    _sum: HabitLogSumAggregateOutputType | null;
    _min: HabitLogMinAggregateOutputType | null;
    _max: HabitLogMaxAggregateOutputType | null;
  };

  export type HabitLogAvgAggregateOutputType = {
    shineScore: number | null;
    moodBefore: number | null;
    moodAfter: number | null;
  };

  export type HabitLogSumAggregateOutputType = {
    shineScore: number | null;
    moodBefore: number | null;
    moodAfter: number | null;
  };

  export type HabitLogMinAggregateOutputType = {
    id: string | null;
    habitId: string | null;
    userId: string | null;
    loggedAt: Date | null;
    completed: boolean | null;
    completionLevel: $Enums.CompletionLevel | null;
    actualBehavior: string | null;
    wantedMore: boolean | null;
    feltEasy: boolean | null;
    shineScore: number | null;
    moodBefore: number | null;
    moodAfter: number | null;
    note: string | null;
    createdAt: Date | null;
  };

  export type HabitLogMaxAggregateOutputType = {
    id: string | null;
    habitId: string | null;
    userId: string | null;
    loggedAt: Date | null;
    completed: boolean | null;
    completionLevel: $Enums.CompletionLevel | null;
    actualBehavior: string | null;
    wantedMore: boolean | null;
    feltEasy: boolean | null;
    shineScore: number | null;
    moodBefore: number | null;
    moodAfter: number | null;
    note: string | null;
    createdAt: Date | null;
  };

  export type HabitLogCountAggregateOutputType = {
    id: number;
    habitId: number;
    userId: number;
    loggedAt: number;
    completed: number;
    completionLevel: number;
    actualBehavior: number;
    wantedMore: number;
    feltEasy: number;
    shineScore: number;
    moodBefore: number;
    moodAfter: number;
    note: number;
    createdAt: number;
    _all: number;
  };

  export type HabitLogAvgAggregateInputType = {
    shineScore?: true;
    moodBefore?: true;
    moodAfter?: true;
  };

  export type HabitLogSumAggregateInputType = {
    shineScore?: true;
    moodBefore?: true;
    moodAfter?: true;
  };

  export type HabitLogMinAggregateInputType = {
    id?: true;
    habitId?: true;
    userId?: true;
    loggedAt?: true;
    completed?: true;
    completionLevel?: true;
    actualBehavior?: true;
    wantedMore?: true;
    feltEasy?: true;
    shineScore?: true;
    moodBefore?: true;
    moodAfter?: true;
    note?: true;
    createdAt?: true;
  };

  export type HabitLogMaxAggregateInputType = {
    id?: true;
    habitId?: true;
    userId?: true;
    loggedAt?: true;
    completed?: true;
    completionLevel?: true;
    actualBehavior?: true;
    wantedMore?: true;
    feltEasy?: true;
    shineScore?: true;
    moodBefore?: true;
    moodAfter?: true;
    note?: true;
    createdAt?: true;
  };

  export type HabitLogCountAggregateInputType = {
    id?: true;
    habitId?: true;
    userId?: true;
    loggedAt?: true;
    completed?: true;
    completionLevel?: true;
    actualBehavior?: true;
    wantedMore?: true;
    feltEasy?: true;
    shineScore?: true;
    moodBefore?: true;
    moodAfter?: true;
    note?: true;
    createdAt?: true;
    _all?: true;
  };

  export type HabitLogAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which HabitLog to aggregate.
     */
    where?: HabitLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HabitLogs to fetch.
     */
    orderBy?:
      | HabitLogOrderByWithRelationInput
      | HabitLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: HabitLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HabitLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HabitLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned HabitLogs
     **/
    _count?: true | HabitLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: HabitLogAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: HabitLogSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: HabitLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: HabitLogMaxAggregateInputType;
  };

  export type GetHabitLogAggregateType<T extends HabitLogAggregateArgs> = {
    [P in keyof T & keyof AggregateHabitLog]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHabitLog[P]>
      : GetScalarType<T[P], AggregateHabitLog[P]>;
  };

  export type HabitLogGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HabitLogWhereInput;
    orderBy?:
      | HabitLogOrderByWithAggregationInput
      | HabitLogOrderByWithAggregationInput[];
    by: HabitLogScalarFieldEnum[] | HabitLogScalarFieldEnum;
    having?: HabitLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HabitLogCountAggregateInputType | true;
    _avg?: HabitLogAvgAggregateInputType;
    _sum?: HabitLogSumAggregateInputType;
    _min?: HabitLogMinAggregateInputType;
    _max?: HabitLogMaxAggregateInputType;
  };

  export type HabitLogGroupByOutputType = {
    id: string;
    habitId: string;
    userId: string;
    loggedAt: Date;
    completed: boolean;
    completionLevel: $Enums.CompletionLevel;
    actualBehavior: string | null;
    wantedMore: boolean | null;
    feltEasy: boolean | null;
    shineScore: number | null;
    moodBefore: number | null;
    moodAfter: number | null;
    note: string | null;
    createdAt: Date;
    _count: HabitLogCountAggregateOutputType | null;
    _avg: HabitLogAvgAggregateOutputType | null;
    _sum: HabitLogSumAggregateOutputType | null;
    _min: HabitLogMinAggregateOutputType | null;
    _max: HabitLogMaxAggregateOutputType | null;
  };

  type GetHabitLogGroupByPayload<T extends HabitLogGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<HabitLogGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof HabitLogGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HabitLogGroupByOutputType[P]>
            : GetScalarType<T[P], HabitLogGroupByOutputType[P]>;
        }
      >
    >;

  export type HabitLogSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      habitId?: boolean;
      userId?: boolean;
      loggedAt?: boolean;
      completed?: boolean;
      completionLevel?: boolean;
      actualBehavior?: boolean;
      wantedMore?: boolean;
      feltEasy?: boolean;
      shineScore?: boolean;
      moodBefore?: boolean;
      moodAfter?: boolean;
      note?: boolean;
      createdAt?: boolean;
      habit?: boolean | HabitDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["habitLog"]
  >;

  export type HabitLogSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      habitId?: boolean;
      userId?: boolean;
      loggedAt?: boolean;
      completed?: boolean;
      completionLevel?: boolean;
      actualBehavior?: boolean;
      wantedMore?: boolean;
      feltEasy?: boolean;
      shineScore?: boolean;
      moodBefore?: boolean;
      moodAfter?: boolean;
      note?: boolean;
      createdAt?: boolean;
      habit?: boolean | HabitDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["habitLog"]
  >;

  export type HabitLogSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      habitId?: boolean;
      userId?: boolean;
      loggedAt?: boolean;
      completed?: boolean;
      completionLevel?: boolean;
      actualBehavior?: boolean;
      wantedMore?: boolean;
      feltEasy?: boolean;
      shineScore?: boolean;
      moodBefore?: boolean;
      moodAfter?: boolean;
      note?: boolean;
      createdAt?: boolean;
      habit?: boolean | HabitDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["habitLog"]
  >;

  export type HabitLogSelectScalar = {
    id?: boolean;
    habitId?: boolean;
    userId?: boolean;
    loggedAt?: boolean;
    completed?: boolean;
    completionLevel?: boolean;
    actualBehavior?: boolean;
    wantedMore?: boolean;
    feltEasy?: boolean;
    shineScore?: boolean;
    moodBefore?: boolean;
    moodAfter?: boolean;
    note?: boolean;
    createdAt?: boolean;
  };

  export type HabitLogOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "habitId"
    | "userId"
    | "loggedAt"
    | "completed"
    | "completionLevel"
    | "actualBehavior"
    | "wantedMore"
    | "feltEasy"
    | "shineScore"
    | "moodBefore"
    | "moodAfter"
    | "note"
    | "createdAt",
    ExtArgs["result"]["habitLog"]
  >;
  export type HabitLogInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    habit?: boolean | HabitDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type HabitLogIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    habit?: boolean | HabitDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type HabitLogIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    habit?: boolean | HabitDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $HabitLogPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "HabitLog";
    objects: {
      habit: Prisma.$HabitPayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        habitId: string;
        userId: string;
        loggedAt: Date;
        completed: boolean;
        completionLevel: $Enums.CompletionLevel;
        actualBehavior: string | null;
        wantedMore: boolean | null;
        feltEasy: boolean | null;
        shineScore: number | null;
        moodBefore: number | null;
        moodAfter: number | null;
        note: string | null;
        createdAt: Date;
      },
      ExtArgs["result"]["habitLog"]
    >;
    composites: {};
  };

  type HabitLogGetPayload<
    S extends boolean | null | undefined | HabitLogDefaultArgs,
  > = $Result.GetResult<Prisma.$HabitLogPayload, S>;

  type HabitLogCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<HabitLogFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: HabitLogCountAggregateInputType | true;
  };

  export interface HabitLogDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["HabitLog"];
      meta: { name: "HabitLog" };
    };
    /**
     * Find zero or one HabitLog that matches the filter.
     * @param {HabitLogFindUniqueArgs} args - Arguments to find a HabitLog
     * @example
     * // Get one HabitLog
     * const habitLog = await prisma.habitLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HabitLogFindUniqueArgs>(
      args: SelectSubset<T, HabitLogFindUniqueArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one HabitLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HabitLogFindUniqueOrThrowArgs} args - Arguments to find a HabitLog
     * @example
     * // Get one HabitLog
     * const habitLog = await prisma.habitLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HabitLogFindUniqueOrThrowArgs>(
      args: SelectSubset<T, HabitLogFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first HabitLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitLogFindFirstArgs} args - Arguments to find a HabitLog
     * @example
     * // Get one HabitLog
     * const habitLog = await prisma.habitLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HabitLogFindFirstArgs>(
      args?: SelectSubset<T, HabitLogFindFirstArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first HabitLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitLogFindFirstOrThrowArgs} args - Arguments to find a HabitLog
     * @example
     * // Get one HabitLog
     * const habitLog = await prisma.habitLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HabitLogFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HabitLogFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more HabitLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HabitLogs
     * const habitLogs = await prisma.habitLog.findMany()
     *
     * // Get first 10 HabitLogs
     * const habitLogs = await prisma.habitLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const habitLogWithIdOnly = await prisma.habitLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HabitLogFindManyArgs>(
      args?: SelectSubset<T, HabitLogFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a HabitLog.
     * @param {HabitLogCreateArgs} args - Arguments to create a HabitLog.
     * @example
     * // Create one HabitLog
     * const HabitLog = await prisma.habitLog.create({
     *   data: {
     *     // ... data to create a HabitLog
     *   }
     * })
     *
     */
    create<T extends HabitLogCreateArgs>(
      args: SelectSubset<T, HabitLogCreateArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many HabitLogs.
     * @param {HabitLogCreateManyArgs} args - Arguments to create many HabitLogs.
     * @example
     * // Create many HabitLogs
     * const habitLog = await prisma.habitLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HabitLogCreateManyArgs>(
      args?: SelectSubset<T, HabitLogCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many HabitLogs and returns the data saved in the database.
     * @param {HabitLogCreateManyAndReturnArgs} args - Arguments to create many HabitLogs.
     * @example
     * // Create many HabitLogs
     * const habitLog = await prisma.habitLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many HabitLogs and only return the `id`
     * const habitLogWithIdOnly = await prisma.habitLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HabitLogCreateManyAndReturnArgs>(
      args?: SelectSubset<T, HabitLogCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a HabitLog.
     * @param {HabitLogDeleteArgs} args - Arguments to delete one HabitLog.
     * @example
     * // Delete one HabitLog
     * const HabitLog = await prisma.habitLog.delete({
     *   where: {
     *     // ... filter to delete one HabitLog
     *   }
     * })
     *
     */
    delete<T extends HabitLogDeleteArgs>(
      args: SelectSubset<T, HabitLogDeleteArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one HabitLog.
     * @param {HabitLogUpdateArgs} args - Arguments to update one HabitLog.
     * @example
     * // Update one HabitLog
     * const habitLog = await prisma.habitLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HabitLogUpdateArgs>(
      args: SelectSubset<T, HabitLogUpdateArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more HabitLogs.
     * @param {HabitLogDeleteManyArgs} args - Arguments to filter HabitLogs to delete.
     * @example
     * // Delete a few HabitLogs
     * const { count } = await prisma.habitLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HabitLogDeleteManyArgs>(
      args?: SelectSubset<T, HabitLogDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more HabitLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HabitLogs
     * const habitLog = await prisma.habitLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HabitLogUpdateManyArgs>(
      args: SelectSubset<T, HabitLogUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more HabitLogs and returns the data updated in the database.
     * @param {HabitLogUpdateManyAndReturnArgs} args - Arguments to update many HabitLogs.
     * @example
     * // Update many HabitLogs
     * const habitLog = await prisma.habitLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more HabitLogs and only return the `id`
     * const habitLogWithIdOnly = await prisma.habitLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends HabitLogUpdateManyAndReturnArgs>(
      args: SelectSubset<T, HabitLogUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one HabitLog.
     * @param {HabitLogUpsertArgs} args - Arguments to update or create a HabitLog.
     * @example
     * // Update or create a HabitLog
     * const habitLog = await prisma.habitLog.upsert({
     *   create: {
     *     // ... data to create a HabitLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HabitLog we want to update
     *   }
     * })
     */
    upsert<T extends HabitLogUpsertArgs>(
      args: SelectSubset<T, HabitLogUpsertArgs<ExtArgs>>,
    ): Prisma__HabitLogClient<
      $Result.GetResult<
        Prisma.$HabitLogPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of HabitLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitLogCountArgs} args - Arguments to filter HabitLogs to count.
     * @example
     * // Count the number of HabitLogs
     * const count = await prisma.habitLog.count({
     *   where: {
     *     // ... the filter for the HabitLogs we want to count
     *   }
     * })
     **/
    count<T extends HabitLogCountArgs>(
      args?: Subset<T, HabitLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], HabitLogCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a HabitLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends HabitLogAggregateArgs>(
      args: Subset<T, HabitLogAggregateArgs>,
    ): Prisma.PrismaPromise<GetHabitLogAggregateType<T>>;

    /**
     * Group by HabitLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HabitLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends HabitLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HabitLogGroupByArgs["orderBy"] }
        : { orderBy?: HabitLogGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, HabitLogGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetHabitLogGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the HabitLog model
     */
    readonly fields: HabitLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HabitLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HabitLogClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    habit<T extends HabitDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, HabitDefaultArgs<ExtArgs>>,
    ): Prisma__HabitClient<
      | $Result.GetResult<
          Prisma.$HabitPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the HabitLog model
   */
  interface HabitLogFieldRefs {
    readonly id: FieldRef<"HabitLog", "String">;
    readonly habitId: FieldRef<"HabitLog", "String">;
    readonly userId: FieldRef<"HabitLog", "String">;
    readonly loggedAt: FieldRef<"HabitLog", "DateTime">;
    readonly completed: FieldRef<"HabitLog", "Boolean">;
    readonly completionLevel: FieldRef<"HabitLog", "CompletionLevel">;
    readonly actualBehavior: FieldRef<"HabitLog", "String">;
    readonly wantedMore: FieldRef<"HabitLog", "Boolean">;
    readonly feltEasy: FieldRef<"HabitLog", "Boolean">;
    readonly shineScore: FieldRef<"HabitLog", "Int">;
    readonly moodBefore: FieldRef<"HabitLog", "Int">;
    readonly moodAfter: FieldRef<"HabitLog", "Int">;
    readonly note: FieldRef<"HabitLog", "String">;
    readonly createdAt: FieldRef<"HabitLog", "DateTime">;
  }

  // Custom InputTypes
  /**
   * HabitLog findUnique
   */
  export type HabitLogFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * Filter, which HabitLog to fetch.
     */
    where: HabitLogWhereUniqueInput;
  };

  /**
   * HabitLog findUniqueOrThrow
   */
  export type HabitLogFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * Filter, which HabitLog to fetch.
     */
    where: HabitLogWhereUniqueInput;
  };

  /**
   * HabitLog findFirst
   */
  export type HabitLogFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * Filter, which HabitLog to fetch.
     */
    where?: HabitLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HabitLogs to fetch.
     */
    orderBy?:
      | HabitLogOrderByWithRelationInput
      | HabitLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HabitLogs.
     */
    cursor?: HabitLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HabitLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HabitLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HabitLogs.
     */
    distinct?: HabitLogScalarFieldEnum | HabitLogScalarFieldEnum[];
  };

  /**
   * HabitLog findFirstOrThrow
   */
  export type HabitLogFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * Filter, which HabitLog to fetch.
     */
    where?: HabitLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HabitLogs to fetch.
     */
    orderBy?:
      | HabitLogOrderByWithRelationInput
      | HabitLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HabitLogs.
     */
    cursor?: HabitLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HabitLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HabitLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HabitLogs.
     */
    distinct?: HabitLogScalarFieldEnum | HabitLogScalarFieldEnum[];
  };

  /**
   * HabitLog findMany
   */
  export type HabitLogFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * Filter, which HabitLogs to fetch.
     */
    where?: HabitLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HabitLogs to fetch.
     */
    orderBy?:
      | HabitLogOrderByWithRelationInput
      | HabitLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing HabitLogs.
     */
    cursor?: HabitLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HabitLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HabitLogs.
     */
    skip?: number;
    distinct?: HabitLogScalarFieldEnum | HabitLogScalarFieldEnum[];
  };

  /**
   * HabitLog create
   */
  export type HabitLogCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * The data needed to create a HabitLog.
     */
    data: XOR<HabitLogCreateInput, HabitLogUncheckedCreateInput>;
  };

  /**
   * HabitLog createMany
   */
  export type HabitLogCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many HabitLogs.
     */
    data: HabitLogCreateManyInput | HabitLogCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * HabitLog createManyAndReturn
   */
  export type HabitLogCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * The data used to create many HabitLogs.
     */
    data: HabitLogCreateManyInput | HabitLogCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * HabitLog update
   */
  export type HabitLogUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * The data needed to update a HabitLog.
     */
    data: XOR<HabitLogUpdateInput, HabitLogUncheckedUpdateInput>;
    /**
     * Choose, which HabitLog to update.
     */
    where: HabitLogWhereUniqueInput;
  };

  /**
   * HabitLog updateMany
   */
  export type HabitLogUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update HabitLogs.
     */
    data: XOR<
      HabitLogUpdateManyMutationInput,
      HabitLogUncheckedUpdateManyInput
    >;
    /**
     * Filter which HabitLogs to update
     */
    where?: HabitLogWhereInput;
    /**
     * Limit how many HabitLogs to update.
     */
    limit?: number;
  };

  /**
   * HabitLog updateManyAndReturn
   */
  export type HabitLogUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * The data used to update HabitLogs.
     */
    data: XOR<
      HabitLogUpdateManyMutationInput,
      HabitLogUncheckedUpdateManyInput
    >;
    /**
     * Filter which HabitLogs to update
     */
    where?: HabitLogWhereInput;
    /**
     * Limit how many HabitLogs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * HabitLog upsert
   */
  export type HabitLogUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * The filter to search for the HabitLog to update in case it exists.
     */
    where: HabitLogWhereUniqueInput;
    /**
     * In case the HabitLog found by the `where` argument doesn't exist, create a new HabitLog with this data.
     */
    create: XOR<HabitLogCreateInput, HabitLogUncheckedCreateInput>;
    /**
     * In case the HabitLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HabitLogUpdateInput, HabitLogUncheckedUpdateInput>;
  };

  /**
   * HabitLog delete
   */
  export type HabitLogDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
    /**
     * Filter which HabitLog to delete.
     */
    where: HabitLogWhereUniqueInput;
  };

  /**
   * HabitLog deleteMany
   */
  export type HabitLogDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which HabitLogs to delete
     */
    where?: HabitLogWhereInput;
    /**
     * Limit how many HabitLogs to delete.
     */
    limit?: number;
  };

  /**
   * HabitLog without action
   */
  export type HabitLogDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the HabitLog
     */
    select?: HabitLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HabitLog
     */
    omit?: HabitLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitLogInclude<ExtArgs> | null;
  };

  /**
   * Model Aspiration
   */

  export type AggregateAspiration = {
    _count: AspirationCountAggregateOutputType | null;
    _avg: AspirationAvgAggregateOutputType | null;
    _sum: AspirationSumAggregateOutputType | null;
    _min: AspirationMinAggregateOutputType | null;
    _max: AspirationMaxAggregateOutputType | null;
  };

  export type AspirationAvgAggregateOutputType = {
    progress: number | null;
  };

  export type AspirationSumAggregateOutputType = {
    progress: number | null;
  };

  export type AspirationMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    description: string | null;
    clarified: string | null;
    category: string | null;
    status: $Enums.AspirationStatus | null;
    progress: number | null;
    achievedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AspirationMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    description: string | null;
    clarified: string | null;
    category: string | null;
    status: $Enums.AspirationStatus | null;
    progress: number | null;
    achievedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AspirationCountAggregateOutputType = {
    id: number;
    userId: number;
    description: number;
    clarified: number;
    category: number;
    status: number;
    progress: number;
    explorationData: number;
    achievedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AspirationAvgAggregateInputType = {
    progress?: true;
  };

  export type AspirationSumAggregateInputType = {
    progress?: true;
  };

  export type AspirationMinAggregateInputType = {
    id?: true;
    userId?: true;
    description?: true;
    clarified?: true;
    category?: true;
    status?: true;
    progress?: true;
    achievedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AspirationMaxAggregateInputType = {
    id?: true;
    userId?: true;
    description?: true;
    clarified?: true;
    category?: true;
    status?: true;
    progress?: true;
    achievedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AspirationCountAggregateInputType = {
    id?: true;
    userId?: true;
    description?: true;
    clarified?: true;
    category?: true;
    status?: true;
    progress?: true;
    explorationData?: true;
    achievedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AspirationAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Aspiration to aggregate.
     */
    where?: AspirationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Aspirations to fetch.
     */
    orderBy?:
      | AspirationOrderByWithRelationInput
      | AspirationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AspirationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Aspirations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Aspirations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Aspirations
     **/
    _count?: true | AspirationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AspirationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AspirationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AspirationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AspirationMaxAggregateInputType;
  };

  export type GetAspirationAggregateType<T extends AspirationAggregateArgs> = {
    [P in keyof T & keyof AggregateAspiration]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAspiration[P]>
      : GetScalarType<T[P], AggregateAspiration[P]>;
  };

  export type AspirationGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AspirationWhereInput;
    orderBy?:
      | AspirationOrderByWithAggregationInput
      | AspirationOrderByWithAggregationInput[];
    by: AspirationScalarFieldEnum[] | AspirationScalarFieldEnum;
    having?: AspirationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AspirationCountAggregateInputType | true;
    _avg?: AspirationAvgAggregateInputType;
    _sum?: AspirationSumAggregateInputType;
    _min?: AspirationMinAggregateInputType;
    _max?: AspirationMaxAggregateInputType;
  };

  export type AspirationGroupByOutputType = {
    id: string;
    userId: string;
    description: string;
    clarified: string | null;
    category: string | null;
    status: $Enums.AspirationStatus;
    progress: number;
    explorationData: JsonValue | null;
    achievedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AspirationCountAggregateOutputType | null;
    _avg: AspirationAvgAggregateOutputType | null;
    _sum: AspirationSumAggregateOutputType | null;
    _min: AspirationMinAggregateOutputType | null;
    _max: AspirationMaxAggregateOutputType | null;
  };

  type GetAspirationGroupByPayload<T extends AspirationGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AspirationGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof AspirationGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AspirationGroupByOutputType[P]>
            : GetScalarType<T[P], AspirationGroupByOutputType[P]>;
        }
      >
    >;

  export type AspirationSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      description?: boolean;
      clarified?: boolean;
      category?: boolean;
      status?: boolean;
      progress?: boolean;
      explorationData?: boolean;
      achievedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      habits?: boolean | Aspiration$habitsArgs<ExtArgs>;
      _count?: boolean | AspirationCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["aspiration"]
  >;

  export type AspirationSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      description?: boolean;
      clarified?: boolean;
      category?: boolean;
      status?: boolean;
      progress?: boolean;
      explorationData?: boolean;
      achievedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["aspiration"]
  >;

  export type AspirationSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      description?: boolean;
      clarified?: boolean;
      category?: boolean;
      status?: boolean;
      progress?: boolean;
      explorationData?: boolean;
      achievedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["aspiration"]
  >;

  export type AspirationSelectScalar = {
    id?: boolean;
    userId?: boolean;
    description?: boolean;
    clarified?: boolean;
    category?: boolean;
    status?: boolean;
    progress?: boolean;
    explorationData?: boolean;
    achievedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AspirationOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "userId"
    | "description"
    | "clarified"
    | "category"
    | "status"
    | "progress"
    | "explorationData"
    | "achievedAt"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["aspiration"]
  >;
  export type AspirationInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    habits?: boolean | Aspiration$habitsArgs<ExtArgs>;
    _count?: boolean | AspirationCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type AspirationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AspirationIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AspirationPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Aspiration";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      habits: Prisma.$HabitPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        description: string;
        clarified: string | null;
        category: string | null;
        status: $Enums.AspirationStatus;
        progress: number;
        explorationData: Prisma.JsonValue | null;
        achievedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["aspiration"]
    >;
    composites: {};
  };

  type AspirationGetPayload<
    S extends boolean | null | undefined | AspirationDefaultArgs,
  > = $Result.GetResult<Prisma.$AspirationPayload, S>;

  type AspirationCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    AspirationFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: AspirationCountAggregateInputType | true;
  };

  export interface AspirationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Aspiration"];
      meta: { name: "Aspiration" };
    };
    /**
     * Find zero or one Aspiration that matches the filter.
     * @param {AspirationFindUniqueArgs} args - Arguments to find a Aspiration
     * @example
     * // Get one Aspiration
     * const aspiration = await prisma.aspiration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AspirationFindUniqueArgs>(
      args: SelectSubset<T, AspirationFindUniqueArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Aspiration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AspirationFindUniqueOrThrowArgs} args - Arguments to find a Aspiration
     * @example
     * // Get one Aspiration
     * const aspiration = await prisma.aspiration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AspirationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AspirationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Aspiration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AspirationFindFirstArgs} args - Arguments to find a Aspiration
     * @example
     * // Get one Aspiration
     * const aspiration = await prisma.aspiration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AspirationFindFirstArgs>(
      args?: SelectSubset<T, AspirationFindFirstArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Aspiration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AspirationFindFirstOrThrowArgs} args - Arguments to find a Aspiration
     * @example
     * // Get one Aspiration
     * const aspiration = await prisma.aspiration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AspirationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AspirationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Aspirations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AspirationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Aspirations
     * const aspirations = await prisma.aspiration.findMany()
     *
     * // Get first 10 Aspirations
     * const aspirations = await prisma.aspiration.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const aspirationWithIdOnly = await prisma.aspiration.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AspirationFindManyArgs>(
      args?: SelectSubset<T, AspirationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Aspiration.
     * @param {AspirationCreateArgs} args - Arguments to create a Aspiration.
     * @example
     * // Create one Aspiration
     * const Aspiration = await prisma.aspiration.create({
     *   data: {
     *     // ... data to create a Aspiration
     *   }
     * })
     *
     */
    create<T extends AspirationCreateArgs>(
      args: SelectSubset<T, AspirationCreateArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Aspirations.
     * @param {AspirationCreateManyArgs} args - Arguments to create many Aspirations.
     * @example
     * // Create many Aspirations
     * const aspiration = await prisma.aspiration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AspirationCreateManyArgs>(
      args?: SelectSubset<T, AspirationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Aspirations and returns the data saved in the database.
     * @param {AspirationCreateManyAndReturnArgs} args - Arguments to create many Aspirations.
     * @example
     * // Create many Aspirations
     * const aspiration = await prisma.aspiration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Aspirations and only return the `id`
     * const aspirationWithIdOnly = await prisma.aspiration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AspirationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AspirationCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Aspiration.
     * @param {AspirationDeleteArgs} args - Arguments to delete one Aspiration.
     * @example
     * // Delete one Aspiration
     * const Aspiration = await prisma.aspiration.delete({
     *   where: {
     *     // ... filter to delete one Aspiration
     *   }
     * })
     *
     */
    delete<T extends AspirationDeleteArgs>(
      args: SelectSubset<T, AspirationDeleteArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Aspiration.
     * @param {AspirationUpdateArgs} args - Arguments to update one Aspiration.
     * @example
     * // Update one Aspiration
     * const aspiration = await prisma.aspiration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AspirationUpdateArgs>(
      args: SelectSubset<T, AspirationUpdateArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Aspirations.
     * @param {AspirationDeleteManyArgs} args - Arguments to filter Aspirations to delete.
     * @example
     * // Delete a few Aspirations
     * const { count } = await prisma.aspiration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AspirationDeleteManyArgs>(
      args?: SelectSubset<T, AspirationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Aspirations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AspirationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Aspirations
     * const aspiration = await prisma.aspiration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AspirationUpdateManyArgs>(
      args: SelectSubset<T, AspirationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Aspirations and returns the data updated in the database.
     * @param {AspirationUpdateManyAndReturnArgs} args - Arguments to update many Aspirations.
     * @example
     * // Update many Aspirations
     * const aspiration = await prisma.aspiration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Aspirations and only return the `id`
     * const aspirationWithIdOnly = await prisma.aspiration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AspirationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AspirationUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Aspiration.
     * @param {AspirationUpsertArgs} args - Arguments to update or create a Aspiration.
     * @example
     * // Update or create a Aspiration
     * const aspiration = await prisma.aspiration.upsert({
     *   create: {
     *     // ... data to create a Aspiration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aspiration we want to update
     *   }
     * })
     */
    upsert<T extends AspirationUpsertArgs>(
      args: SelectSubset<T, AspirationUpsertArgs<ExtArgs>>,
    ): Prisma__AspirationClient<
      $Result.GetResult<
        Prisma.$AspirationPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Aspirations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AspirationCountArgs} args - Arguments to filter Aspirations to count.
     * @example
     * // Count the number of Aspirations
     * const count = await prisma.aspiration.count({
     *   where: {
     *     // ... the filter for the Aspirations we want to count
     *   }
     * })
     **/
    count<T extends AspirationCountArgs>(
      args?: Subset<T, AspirationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AspirationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Aspiration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AspirationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AspirationAggregateArgs>(
      args: Subset<T, AspirationAggregateArgs>,
    ): Prisma.PrismaPromise<GetAspirationAggregateType<T>>;

    /**
     * Group by Aspiration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AspirationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AspirationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AspirationGroupByArgs["orderBy"] }
        : { orderBy?: AspirationGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AspirationGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetAspirationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Aspiration model
     */
    readonly fields: AspirationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aspiration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AspirationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    habits<T extends Aspiration$habitsArgs<ExtArgs> = {}>(
      args?: Subset<T, Aspiration$habitsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$HabitPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Aspiration model
   */
  interface AspirationFieldRefs {
    readonly id: FieldRef<"Aspiration", "String">;
    readonly userId: FieldRef<"Aspiration", "String">;
    readonly description: FieldRef<"Aspiration", "String">;
    readonly clarified: FieldRef<"Aspiration", "String">;
    readonly category: FieldRef<"Aspiration", "String">;
    readonly status: FieldRef<"Aspiration", "AspirationStatus">;
    readonly progress: FieldRef<"Aspiration", "Int">;
    readonly explorationData: FieldRef<"Aspiration", "Json">;
    readonly achievedAt: FieldRef<"Aspiration", "DateTime">;
    readonly createdAt: FieldRef<"Aspiration", "DateTime">;
    readonly updatedAt: FieldRef<"Aspiration", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Aspiration findUnique
   */
  export type AspirationFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * Filter, which Aspiration to fetch.
     */
    where: AspirationWhereUniqueInput;
  };

  /**
   * Aspiration findUniqueOrThrow
   */
  export type AspirationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * Filter, which Aspiration to fetch.
     */
    where: AspirationWhereUniqueInput;
  };

  /**
   * Aspiration findFirst
   */
  export type AspirationFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * Filter, which Aspiration to fetch.
     */
    where?: AspirationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Aspirations to fetch.
     */
    orderBy?:
      | AspirationOrderByWithRelationInput
      | AspirationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Aspirations.
     */
    cursor?: AspirationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Aspirations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Aspirations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Aspirations.
     */
    distinct?: AspirationScalarFieldEnum | AspirationScalarFieldEnum[];
  };

  /**
   * Aspiration findFirstOrThrow
   */
  export type AspirationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * Filter, which Aspiration to fetch.
     */
    where?: AspirationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Aspirations to fetch.
     */
    orderBy?:
      | AspirationOrderByWithRelationInput
      | AspirationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Aspirations.
     */
    cursor?: AspirationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Aspirations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Aspirations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Aspirations.
     */
    distinct?: AspirationScalarFieldEnum | AspirationScalarFieldEnum[];
  };

  /**
   * Aspiration findMany
   */
  export type AspirationFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * Filter, which Aspirations to fetch.
     */
    where?: AspirationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Aspirations to fetch.
     */
    orderBy?:
      | AspirationOrderByWithRelationInput
      | AspirationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Aspirations.
     */
    cursor?: AspirationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Aspirations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Aspirations.
     */
    skip?: number;
    distinct?: AspirationScalarFieldEnum | AspirationScalarFieldEnum[];
  };

  /**
   * Aspiration create
   */
  export type AspirationCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * The data needed to create a Aspiration.
     */
    data: XOR<AspirationCreateInput, AspirationUncheckedCreateInput>;
  };

  /**
   * Aspiration createMany
   */
  export type AspirationCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Aspirations.
     */
    data: AspirationCreateManyInput | AspirationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Aspiration createManyAndReturn
   */
  export type AspirationCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * The data used to create many Aspirations.
     */
    data: AspirationCreateManyInput | AspirationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Aspiration update
   */
  export type AspirationUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * The data needed to update a Aspiration.
     */
    data: XOR<AspirationUpdateInput, AspirationUncheckedUpdateInput>;
    /**
     * Choose, which Aspiration to update.
     */
    where: AspirationWhereUniqueInput;
  };

  /**
   * Aspiration updateMany
   */
  export type AspirationUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Aspirations.
     */
    data: XOR<
      AspirationUpdateManyMutationInput,
      AspirationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Aspirations to update
     */
    where?: AspirationWhereInput;
    /**
     * Limit how many Aspirations to update.
     */
    limit?: number;
  };

  /**
   * Aspiration updateManyAndReturn
   */
  export type AspirationUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * The data used to update Aspirations.
     */
    data: XOR<
      AspirationUpdateManyMutationInput,
      AspirationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Aspirations to update
     */
    where?: AspirationWhereInput;
    /**
     * Limit how many Aspirations to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Aspiration upsert
   */
  export type AspirationUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * The filter to search for the Aspiration to update in case it exists.
     */
    where: AspirationWhereUniqueInput;
    /**
     * In case the Aspiration found by the `where` argument doesn't exist, create a new Aspiration with this data.
     */
    create: XOR<AspirationCreateInput, AspirationUncheckedCreateInput>;
    /**
     * In case the Aspiration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AspirationUpdateInput, AspirationUncheckedUpdateInput>;
  };

  /**
   * Aspiration delete
   */
  export type AspirationDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
    /**
     * Filter which Aspiration to delete.
     */
    where: AspirationWhereUniqueInput;
  };

  /**
   * Aspiration deleteMany
   */
  export type AspirationDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Aspirations to delete
     */
    where?: AspirationWhereInput;
    /**
     * Limit how many Aspirations to delete.
     */
    limit?: number;
  };

  /**
   * Aspiration.habits
   */
  export type Aspiration$habitsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Habit
     */
    select?: HabitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Habit
     */
    omit?: HabitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HabitInclude<ExtArgs> | null;
    where?: HabitWhereInput;
    orderBy?: HabitOrderByWithRelationInput | HabitOrderByWithRelationInput[];
    cursor?: HabitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: HabitScalarFieldEnum | HabitScalarFieldEnum[];
  };

  /**
   * Aspiration without action
   */
  export type AspirationDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Aspiration
     */
    select?: AspirationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Aspiration
     */
    omit?: AspirationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AspirationInclude<ExtArgs> | null;
  };

  /**
   * Model CelebrationMethod
   */

  export type AggregateCelebrationMethod = {
    _count: CelebrationMethodCountAggregateOutputType | null;
    _min: CelebrationMethodMinAggregateOutputType | null;
    _max: CelebrationMethodMaxAggregateOutputType | null;
  };

  export type CelebrationMethodMinAggregateOutputType = {
    id: string | null;
    category: $Enums.CelebrationCategory | null;
    content: string | null;
    emoji: string | null;
    isBuiltIn: boolean | null;
  };

  export type CelebrationMethodMaxAggregateOutputType = {
    id: string | null;
    category: $Enums.CelebrationCategory | null;
    content: string | null;
    emoji: string | null;
    isBuiltIn: boolean | null;
  };

  export type CelebrationMethodCountAggregateOutputType = {
    id: number;
    category: number;
    content: number;
    emoji: number;
    isBuiltIn: number;
    _all: number;
  };

  export type CelebrationMethodMinAggregateInputType = {
    id?: true;
    category?: true;
    content?: true;
    emoji?: true;
    isBuiltIn?: true;
  };

  export type CelebrationMethodMaxAggregateInputType = {
    id?: true;
    category?: true;
    content?: true;
    emoji?: true;
    isBuiltIn?: true;
  };

  export type CelebrationMethodCountAggregateInputType = {
    id?: true;
    category?: true;
    content?: true;
    emoji?: true;
    isBuiltIn?: true;
    _all?: true;
  };

  export type CelebrationMethodAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which CelebrationMethod to aggregate.
     */
    where?: CelebrationMethodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CelebrationMethods to fetch.
     */
    orderBy?:
      | CelebrationMethodOrderByWithRelationInput
      | CelebrationMethodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CelebrationMethodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CelebrationMethods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CelebrationMethods.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CelebrationMethods
     **/
    _count?: true | CelebrationMethodCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CelebrationMethodMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CelebrationMethodMaxAggregateInputType;
  };

  export type GetCelebrationMethodAggregateType<
    T extends CelebrationMethodAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateCelebrationMethod]: P extends
      | "_count"
      | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCelebrationMethod[P]>
      : GetScalarType<T[P], AggregateCelebrationMethod[P]>;
  };

  export type CelebrationMethodGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CelebrationMethodWhereInput;
    orderBy?:
      | CelebrationMethodOrderByWithAggregationInput
      | CelebrationMethodOrderByWithAggregationInput[];
    by: CelebrationMethodScalarFieldEnum[] | CelebrationMethodScalarFieldEnum;
    having?: CelebrationMethodScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CelebrationMethodCountAggregateInputType | true;
    _min?: CelebrationMethodMinAggregateInputType;
    _max?: CelebrationMethodMaxAggregateInputType;
  };

  export type CelebrationMethodGroupByOutputType = {
    id: string;
    category: $Enums.CelebrationCategory;
    content: string;
    emoji: string | null;
    isBuiltIn: boolean;
    _count: CelebrationMethodCountAggregateOutputType | null;
    _min: CelebrationMethodMinAggregateOutputType | null;
    _max: CelebrationMethodMaxAggregateOutputType | null;
  };

  type GetCelebrationMethodGroupByPayload<
    T extends CelebrationMethodGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CelebrationMethodGroupByOutputType, T["by"]> & {
        [P in keyof T &
          keyof CelebrationMethodGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], CelebrationMethodGroupByOutputType[P]>
          : GetScalarType<T[P], CelebrationMethodGroupByOutputType[P]>;
      }
    >
  >;

  export type CelebrationMethodSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      category?: boolean;
      content?: boolean;
      emoji?: boolean;
      isBuiltIn?: boolean;
      userFavorites?: boolean | CelebrationMethod$userFavoritesArgs<ExtArgs>;
      _count?: boolean | CelebrationMethodCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["celebrationMethod"]
  >;

  export type CelebrationMethodSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      category?: boolean;
      content?: boolean;
      emoji?: boolean;
      isBuiltIn?: boolean;
    },
    ExtArgs["result"]["celebrationMethod"]
  >;

  export type CelebrationMethodSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      category?: boolean;
      content?: boolean;
      emoji?: boolean;
      isBuiltIn?: boolean;
    },
    ExtArgs["result"]["celebrationMethod"]
  >;

  export type CelebrationMethodSelectScalar = {
    id?: boolean;
    category?: boolean;
    content?: boolean;
    emoji?: boolean;
    isBuiltIn?: boolean;
  };

  export type CelebrationMethodOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "category" | "content" | "emoji" | "isBuiltIn",
    ExtArgs["result"]["celebrationMethod"]
  >;
  export type CelebrationMethodInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    userFavorites?: boolean | CelebrationMethod$userFavoritesArgs<ExtArgs>;
    _count?: boolean | CelebrationMethodCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CelebrationMethodIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type CelebrationMethodIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $CelebrationMethodPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "CelebrationMethod";
    objects: {
      userFavorites: Prisma.$UserCelebrationPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        category: $Enums.CelebrationCategory;
        content: string;
        emoji: string | null;
        isBuiltIn: boolean;
      },
      ExtArgs["result"]["celebrationMethod"]
    >;
    composites: {};
  };

  type CelebrationMethodGetPayload<
    S extends boolean | null | undefined | CelebrationMethodDefaultArgs,
  > = $Result.GetResult<Prisma.$CelebrationMethodPayload, S>;

  type CelebrationMethodCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    CelebrationMethodFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: CelebrationMethodCountAggregateInputType | true;
  };

  export interface CelebrationMethodDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["CelebrationMethod"];
      meta: { name: "CelebrationMethod" };
    };
    /**
     * Find zero or one CelebrationMethod that matches the filter.
     * @param {CelebrationMethodFindUniqueArgs} args - Arguments to find a CelebrationMethod
     * @example
     * // Get one CelebrationMethod
     * const celebrationMethod = await prisma.celebrationMethod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CelebrationMethodFindUniqueArgs>(
      args: SelectSubset<T, CelebrationMethodFindUniqueArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one CelebrationMethod that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CelebrationMethodFindUniqueOrThrowArgs} args - Arguments to find a CelebrationMethod
     * @example
     * // Get one CelebrationMethod
     * const celebrationMethod = await prisma.celebrationMethod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CelebrationMethodFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CelebrationMethodFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first CelebrationMethod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrationMethodFindFirstArgs} args - Arguments to find a CelebrationMethod
     * @example
     * // Get one CelebrationMethod
     * const celebrationMethod = await prisma.celebrationMethod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CelebrationMethodFindFirstArgs>(
      args?: SelectSubset<T, CelebrationMethodFindFirstArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first CelebrationMethod that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrationMethodFindFirstOrThrowArgs} args - Arguments to find a CelebrationMethod
     * @example
     * // Get one CelebrationMethod
     * const celebrationMethod = await prisma.celebrationMethod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CelebrationMethodFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CelebrationMethodFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more CelebrationMethods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrationMethodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CelebrationMethods
     * const celebrationMethods = await prisma.celebrationMethod.findMany()
     *
     * // Get first 10 CelebrationMethods
     * const celebrationMethods = await prisma.celebrationMethod.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const celebrationMethodWithIdOnly = await prisma.celebrationMethod.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CelebrationMethodFindManyArgs>(
      args?: SelectSubset<T, CelebrationMethodFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a CelebrationMethod.
     * @param {CelebrationMethodCreateArgs} args - Arguments to create a CelebrationMethod.
     * @example
     * // Create one CelebrationMethod
     * const CelebrationMethod = await prisma.celebrationMethod.create({
     *   data: {
     *     // ... data to create a CelebrationMethod
     *   }
     * })
     *
     */
    create<T extends CelebrationMethodCreateArgs>(
      args: SelectSubset<T, CelebrationMethodCreateArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many CelebrationMethods.
     * @param {CelebrationMethodCreateManyArgs} args - Arguments to create many CelebrationMethods.
     * @example
     * // Create many CelebrationMethods
     * const celebrationMethod = await prisma.celebrationMethod.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CelebrationMethodCreateManyArgs>(
      args?: SelectSubset<T, CelebrationMethodCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many CelebrationMethods and returns the data saved in the database.
     * @param {CelebrationMethodCreateManyAndReturnArgs} args - Arguments to create many CelebrationMethods.
     * @example
     * // Create many CelebrationMethods
     * const celebrationMethod = await prisma.celebrationMethod.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CelebrationMethods and only return the `id`
     * const celebrationMethodWithIdOnly = await prisma.celebrationMethod.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CelebrationMethodCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CelebrationMethodCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a CelebrationMethod.
     * @param {CelebrationMethodDeleteArgs} args - Arguments to delete one CelebrationMethod.
     * @example
     * // Delete one CelebrationMethod
     * const CelebrationMethod = await prisma.celebrationMethod.delete({
     *   where: {
     *     // ... filter to delete one CelebrationMethod
     *   }
     * })
     *
     */
    delete<T extends CelebrationMethodDeleteArgs>(
      args: SelectSubset<T, CelebrationMethodDeleteArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one CelebrationMethod.
     * @param {CelebrationMethodUpdateArgs} args - Arguments to update one CelebrationMethod.
     * @example
     * // Update one CelebrationMethod
     * const celebrationMethod = await prisma.celebrationMethod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CelebrationMethodUpdateArgs>(
      args: SelectSubset<T, CelebrationMethodUpdateArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more CelebrationMethods.
     * @param {CelebrationMethodDeleteManyArgs} args - Arguments to filter CelebrationMethods to delete.
     * @example
     * // Delete a few CelebrationMethods
     * const { count } = await prisma.celebrationMethod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CelebrationMethodDeleteManyArgs>(
      args?: SelectSubset<T, CelebrationMethodDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more CelebrationMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrationMethodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CelebrationMethods
     * const celebrationMethod = await prisma.celebrationMethod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CelebrationMethodUpdateManyArgs>(
      args: SelectSubset<T, CelebrationMethodUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more CelebrationMethods and returns the data updated in the database.
     * @param {CelebrationMethodUpdateManyAndReturnArgs} args - Arguments to update many CelebrationMethods.
     * @example
     * // Update many CelebrationMethods
     * const celebrationMethod = await prisma.celebrationMethod.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CelebrationMethods and only return the `id`
     * const celebrationMethodWithIdOnly = await prisma.celebrationMethod.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CelebrationMethodUpdateManyAndReturnArgs>(
      args: SelectSubset<T, CelebrationMethodUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one CelebrationMethod.
     * @param {CelebrationMethodUpsertArgs} args - Arguments to update or create a CelebrationMethod.
     * @example
     * // Update or create a CelebrationMethod
     * const celebrationMethod = await prisma.celebrationMethod.upsert({
     *   create: {
     *     // ... data to create a CelebrationMethod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CelebrationMethod we want to update
     *   }
     * })
     */
    upsert<T extends CelebrationMethodUpsertArgs>(
      args: SelectSubset<T, CelebrationMethodUpsertArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      $Result.GetResult<
        Prisma.$CelebrationMethodPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of CelebrationMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrationMethodCountArgs} args - Arguments to filter CelebrationMethods to count.
     * @example
     * // Count the number of CelebrationMethods
     * const count = await prisma.celebrationMethod.count({
     *   where: {
     *     // ... the filter for the CelebrationMethods we want to count
     *   }
     * })
     **/
    count<T extends CelebrationMethodCountArgs>(
      args?: Subset<T, CelebrationMethodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<
              T["select"],
              CelebrationMethodCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a CelebrationMethod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrationMethodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CelebrationMethodAggregateArgs>(
      args: Subset<T, CelebrationMethodAggregateArgs>,
    ): Prisma.PrismaPromise<GetCelebrationMethodAggregateType<T>>;

    /**
     * Group by CelebrationMethod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CelebrationMethodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CelebrationMethodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CelebrationMethodGroupByArgs["orderBy"] }
        : { orderBy?: CelebrationMethodGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CelebrationMethodGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetCelebrationMethodGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CelebrationMethod model
     */
    readonly fields: CelebrationMethodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CelebrationMethod.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CelebrationMethodClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    userFavorites<T extends CelebrationMethod$userFavoritesArgs<ExtArgs> = {}>(
      args?: Subset<T, CelebrationMethod$userFavoritesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$UserCelebrationPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the CelebrationMethod model
   */
  interface CelebrationMethodFieldRefs {
    readonly id: FieldRef<"CelebrationMethod", "String">;
    readonly category: FieldRef<"CelebrationMethod", "CelebrationCategory">;
    readonly content: FieldRef<"CelebrationMethod", "String">;
    readonly emoji: FieldRef<"CelebrationMethod", "String">;
    readonly isBuiltIn: FieldRef<"CelebrationMethod", "Boolean">;
  }

  // Custom InputTypes
  /**
   * CelebrationMethod findUnique
   */
  export type CelebrationMethodFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * Filter, which CelebrationMethod to fetch.
     */
    where: CelebrationMethodWhereUniqueInput;
  };

  /**
   * CelebrationMethod findUniqueOrThrow
   */
  export type CelebrationMethodFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * Filter, which CelebrationMethod to fetch.
     */
    where: CelebrationMethodWhereUniqueInput;
  };

  /**
   * CelebrationMethod findFirst
   */
  export type CelebrationMethodFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * Filter, which CelebrationMethod to fetch.
     */
    where?: CelebrationMethodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CelebrationMethods to fetch.
     */
    orderBy?:
      | CelebrationMethodOrderByWithRelationInput
      | CelebrationMethodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CelebrationMethods.
     */
    cursor?: CelebrationMethodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CelebrationMethods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CelebrationMethods.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CelebrationMethods.
     */
    distinct?:
      | CelebrationMethodScalarFieldEnum
      | CelebrationMethodScalarFieldEnum[];
  };

  /**
   * CelebrationMethod findFirstOrThrow
   */
  export type CelebrationMethodFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * Filter, which CelebrationMethod to fetch.
     */
    where?: CelebrationMethodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CelebrationMethods to fetch.
     */
    orderBy?:
      | CelebrationMethodOrderByWithRelationInput
      | CelebrationMethodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CelebrationMethods.
     */
    cursor?: CelebrationMethodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CelebrationMethods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CelebrationMethods.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CelebrationMethods.
     */
    distinct?:
      | CelebrationMethodScalarFieldEnum
      | CelebrationMethodScalarFieldEnum[];
  };

  /**
   * CelebrationMethod findMany
   */
  export type CelebrationMethodFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * Filter, which CelebrationMethods to fetch.
     */
    where?: CelebrationMethodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CelebrationMethods to fetch.
     */
    orderBy?:
      | CelebrationMethodOrderByWithRelationInput
      | CelebrationMethodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CelebrationMethods.
     */
    cursor?: CelebrationMethodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CelebrationMethods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CelebrationMethods.
     */
    skip?: number;
    distinct?:
      | CelebrationMethodScalarFieldEnum
      | CelebrationMethodScalarFieldEnum[];
  };

  /**
   * CelebrationMethod create
   */
  export type CelebrationMethodCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * The data needed to create a CelebrationMethod.
     */
    data: XOR<
      CelebrationMethodCreateInput,
      CelebrationMethodUncheckedCreateInput
    >;
  };

  /**
   * CelebrationMethod createMany
   */
  export type CelebrationMethodCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many CelebrationMethods.
     */
    data: CelebrationMethodCreateManyInput | CelebrationMethodCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * CelebrationMethod createManyAndReturn
   */
  export type CelebrationMethodCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * The data used to create many CelebrationMethods.
     */
    data: CelebrationMethodCreateManyInput | CelebrationMethodCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * CelebrationMethod update
   */
  export type CelebrationMethodUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * The data needed to update a CelebrationMethod.
     */
    data: XOR<
      CelebrationMethodUpdateInput,
      CelebrationMethodUncheckedUpdateInput
    >;
    /**
     * Choose, which CelebrationMethod to update.
     */
    where: CelebrationMethodWhereUniqueInput;
  };

  /**
   * CelebrationMethod updateMany
   */
  export type CelebrationMethodUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update CelebrationMethods.
     */
    data: XOR<
      CelebrationMethodUpdateManyMutationInput,
      CelebrationMethodUncheckedUpdateManyInput
    >;
    /**
     * Filter which CelebrationMethods to update
     */
    where?: CelebrationMethodWhereInput;
    /**
     * Limit how many CelebrationMethods to update.
     */
    limit?: number;
  };

  /**
   * CelebrationMethod updateManyAndReturn
   */
  export type CelebrationMethodUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * The data used to update CelebrationMethods.
     */
    data: XOR<
      CelebrationMethodUpdateManyMutationInput,
      CelebrationMethodUncheckedUpdateManyInput
    >;
    /**
     * Filter which CelebrationMethods to update
     */
    where?: CelebrationMethodWhereInput;
    /**
     * Limit how many CelebrationMethods to update.
     */
    limit?: number;
  };

  /**
   * CelebrationMethod upsert
   */
  export type CelebrationMethodUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * The filter to search for the CelebrationMethod to update in case it exists.
     */
    where: CelebrationMethodWhereUniqueInput;
    /**
     * In case the CelebrationMethod found by the `where` argument doesn't exist, create a new CelebrationMethod with this data.
     */
    create: XOR<
      CelebrationMethodCreateInput,
      CelebrationMethodUncheckedCreateInput
    >;
    /**
     * In case the CelebrationMethod was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      CelebrationMethodUpdateInput,
      CelebrationMethodUncheckedUpdateInput
    >;
  };

  /**
   * CelebrationMethod delete
   */
  export type CelebrationMethodDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
    /**
     * Filter which CelebrationMethod to delete.
     */
    where: CelebrationMethodWhereUniqueInput;
  };

  /**
   * CelebrationMethod deleteMany
   */
  export type CelebrationMethodDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which CelebrationMethods to delete
     */
    where?: CelebrationMethodWhereInput;
    /**
     * Limit how many CelebrationMethods to delete.
     */
    limit?: number;
  };

  /**
   * CelebrationMethod.userFavorites
   */
  export type CelebrationMethod$userFavoritesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    where?: UserCelebrationWhereInput;
    orderBy?:
      | UserCelebrationOrderByWithRelationInput
      | UserCelebrationOrderByWithRelationInput[];
    cursor?: UserCelebrationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | UserCelebrationScalarFieldEnum
      | UserCelebrationScalarFieldEnum[];
  };

  /**
   * CelebrationMethod without action
   */
  export type CelebrationMethodDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CelebrationMethod
     */
    select?: CelebrationMethodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CelebrationMethod
     */
    omit?: CelebrationMethodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CelebrationMethodInclude<ExtArgs> | null;
  };

  /**
   * Model UserCelebration
   */

  export type AggregateUserCelebration = {
    _count: UserCelebrationCountAggregateOutputType | null;
    _avg: UserCelebrationAvgAggregateOutputType | null;
    _sum: UserCelebrationSumAggregateOutputType | null;
    _min: UserCelebrationMinAggregateOutputType | null;
    _max: UserCelebrationMaxAggregateOutputType | null;
  };

  export type UserCelebrationAvgAggregateOutputType = {
    useCount: number | null;
  };

  export type UserCelebrationSumAggregateOutputType = {
    useCount: number | null;
  };

  export type UserCelebrationMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    celebrationMethodId: string | null;
    isDefault: boolean | null;
    useCount: number | null;
  };

  export type UserCelebrationMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    celebrationMethodId: string | null;
    isDefault: boolean | null;
    useCount: number | null;
  };

  export type UserCelebrationCountAggregateOutputType = {
    id: number;
    userId: number;
    celebrationMethodId: number;
    isDefault: number;
    useCount: number;
    _all: number;
  };

  export type UserCelebrationAvgAggregateInputType = {
    useCount?: true;
  };

  export type UserCelebrationSumAggregateInputType = {
    useCount?: true;
  };

  export type UserCelebrationMinAggregateInputType = {
    id?: true;
    userId?: true;
    celebrationMethodId?: true;
    isDefault?: true;
    useCount?: true;
  };

  export type UserCelebrationMaxAggregateInputType = {
    id?: true;
    userId?: true;
    celebrationMethodId?: true;
    isDefault?: true;
    useCount?: true;
  };

  export type UserCelebrationCountAggregateInputType = {
    id?: true;
    userId?: true;
    celebrationMethodId?: true;
    isDefault?: true;
    useCount?: true;
    _all?: true;
  };

  export type UserCelebrationAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserCelebration to aggregate.
     */
    where?: UserCelebrationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserCelebrations to fetch.
     */
    orderBy?:
      | UserCelebrationOrderByWithRelationInput
      | UserCelebrationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserCelebrationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserCelebrations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserCelebrations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserCelebrations
     **/
    _count?: true | UserCelebrationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserCelebrationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserCelebrationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserCelebrationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserCelebrationMaxAggregateInputType;
  };

  export type GetUserCelebrationAggregateType<
    T extends UserCelebrationAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateUserCelebration]: P extends
      | "_count"
      | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCelebration[P]>
      : GetScalarType<T[P], AggregateUserCelebration[P]>;
  };

  export type UserCelebrationGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserCelebrationWhereInput;
    orderBy?:
      | UserCelebrationOrderByWithAggregationInput
      | UserCelebrationOrderByWithAggregationInput[];
    by: UserCelebrationScalarFieldEnum[] | UserCelebrationScalarFieldEnum;
    having?: UserCelebrationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCelebrationCountAggregateInputType | true;
    _avg?: UserCelebrationAvgAggregateInputType;
    _sum?: UserCelebrationSumAggregateInputType;
    _min?: UserCelebrationMinAggregateInputType;
    _max?: UserCelebrationMaxAggregateInputType;
  };

  export type UserCelebrationGroupByOutputType = {
    id: string;
    userId: string;
    celebrationMethodId: string;
    isDefault: boolean;
    useCount: number;
    _count: UserCelebrationCountAggregateOutputType | null;
    _avg: UserCelebrationAvgAggregateOutputType | null;
    _sum: UserCelebrationSumAggregateOutputType | null;
    _min: UserCelebrationMinAggregateOutputType | null;
    _max: UserCelebrationMaxAggregateOutputType | null;
  };

  type GetUserCelebrationGroupByPayload<T extends UserCelebrationGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<UserCelebrationGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof UserCelebrationGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCelebrationGroupByOutputType[P]>
            : GetScalarType<T[P], UserCelebrationGroupByOutputType[P]>;
        }
      >
    >;

  export type UserCelebrationSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      celebrationMethodId?: boolean;
      isDefault?: boolean;
      useCount?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      celebrationMethod?: boolean | CelebrationMethodDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userCelebration"]
  >;

  export type UserCelebrationSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      celebrationMethodId?: boolean;
      isDefault?: boolean;
      useCount?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      celebrationMethod?: boolean | CelebrationMethodDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userCelebration"]
  >;

  export type UserCelebrationSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      celebrationMethodId?: boolean;
      isDefault?: boolean;
      useCount?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      celebrationMethod?: boolean | CelebrationMethodDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userCelebration"]
  >;

  export type UserCelebrationSelectScalar = {
    id?: boolean;
    userId?: boolean;
    celebrationMethodId?: boolean;
    isDefault?: boolean;
    useCount?: boolean;
  };

  export type UserCelebrationOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "userId" | "celebrationMethodId" | "isDefault" | "useCount",
    ExtArgs["result"]["userCelebration"]
  >;
  export type UserCelebrationInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    celebrationMethod?: boolean | CelebrationMethodDefaultArgs<ExtArgs>;
  };
  export type UserCelebrationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    celebrationMethod?: boolean | CelebrationMethodDefaultArgs<ExtArgs>;
  };
  export type UserCelebrationIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    celebrationMethod?: boolean | CelebrationMethodDefaultArgs<ExtArgs>;
  };

  export type $UserCelebrationPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "UserCelebration";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      celebrationMethod: Prisma.$CelebrationMethodPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        celebrationMethodId: string;
        isDefault: boolean;
        useCount: number;
      },
      ExtArgs["result"]["userCelebration"]
    >;
    composites: {};
  };

  type UserCelebrationGetPayload<
    S extends boolean | null | undefined | UserCelebrationDefaultArgs,
  > = $Result.GetResult<Prisma.$UserCelebrationPayload, S>;

  type UserCelebrationCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    UserCelebrationFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: UserCelebrationCountAggregateInputType | true;
  };

  export interface UserCelebrationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["UserCelebration"];
      meta: { name: "UserCelebration" };
    };
    /**
     * Find zero or one UserCelebration that matches the filter.
     * @param {UserCelebrationFindUniqueArgs} args - Arguments to find a UserCelebration
     * @example
     * // Get one UserCelebration
     * const userCelebration = await prisma.userCelebration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCelebrationFindUniqueArgs>(
      args: SelectSubset<T, UserCelebrationFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one UserCelebration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCelebrationFindUniqueOrThrowArgs} args - Arguments to find a UserCelebration
     * @example
     * // Get one UserCelebration
     * const userCelebration = await prisma.userCelebration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCelebrationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserCelebrationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserCelebration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCelebrationFindFirstArgs} args - Arguments to find a UserCelebration
     * @example
     * // Get one UserCelebration
     * const userCelebration = await prisma.userCelebration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCelebrationFindFirstArgs>(
      args?: SelectSubset<T, UserCelebrationFindFirstArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserCelebration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCelebrationFindFirstOrThrowArgs} args - Arguments to find a UserCelebration
     * @example
     * // Get one UserCelebration
     * const userCelebration = await prisma.userCelebration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCelebrationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserCelebrationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more UserCelebrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCelebrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCelebrations
     * const userCelebrations = await prisma.userCelebration.findMany()
     *
     * // Get first 10 UserCelebrations
     * const userCelebrations = await prisma.userCelebration.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userCelebrationWithIdOnly = await prisma.userCelebration.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserCelebrationFindManyArgs>(
      args?: SelectSubset<T, UserCelebrationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a UserCelebration.
     * @param {UserCelebrationCreateArgs} args - Arguments to create a UserCelebration.
     * @example
     * // Create one UserCelebration
     * const UserCelebration = await prisma.userCelebration.create({
     *   data: {
     *     // ... data to create a UserCelebration
     *   }
     * })
     *
     */
    create<T extends UserCelebrationCreateArgs>(
      args: SelectSubset<T, UserCelebrationCreateArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many UserCelebrations.
     * @param {UserCelebrationCreateManyArgs} args - Arguments to create many UserCelebrations.
     * @example
     * // Create many UserCelebrations
     * const userCelebration = await prisma.userCelebration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCelebrationCreateManyArgs>(
      args?: SelectSubset<T, UserCelebrationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many UserCelebrations and returns the data saved in the database.
     * @param {UserCelebrationCreateManyAndReturnArgs} args - Arguments to create many UserCelebrations.
     * @example
     * // Create many UserCelebrations
     * const userCelebration = await prisma.userCelebration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserCelebrations and only return the `id`
     * const userCelebrationWithIdOnly = await prisma.userCelebration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCelebrationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCelebrationCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a UserCelebration.
     * @param {UserCelebrationDeleteArgs} args - Arguments to delete one UserCelebration.
     * @example
     * // Delete one UserCelebration
     * const UserCelebration = await prisma.userCelebration.delete({
     *   where: {
     *     // ... filter to delete one UserCelebration
     *   }
     * })
     *
     */
    delete<T extends UserCelebrationDeleteArgs>(
      args: SelectSubset<T, UserCelebrationDeleteArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one UserCelebration.
     * @param {UserCelebrationUpdateArgs} args - Arguments to update one UserCelebration.
     * @example
     * // Update one UserCelebration
     * const userCelebration = await prisma.userCelebration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserCelebrationUpdateArgs>(
      args: SelectSubset<T, UserCelebrationUpdateArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more UserCelebrations.
     * @param {UserCelebrationDeleteManyArgs} args - Arguments to filter UserCelebrations to delete.
     * @example
     * // Delete a few UserCelebrations
     * const { count } = await prisma.userCelebration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserCelebrationDeleteManyArgs>(
      args?: SelectSubset<T, UserCelebrationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserCelebrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCelebrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCelebrations
     * const userCelebration = await prisma.userCelebration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserCelebrationUpdateManyArgs>(
      args: SelectSubset<T, UserCelebrationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserCelebrations and returns the data updated in the database.
     * @param {UserCelebrationUpdateManyAndReturnArgs} args - Arguments to update many UserCelebrations.
     * @example
     * // Update many UserCelebrations
     * const userCelebration = await prisma.userCelebration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UserCelebrations and only return the `id`
     * const userCelebrationWithIdOnly = await prisma.userCelebration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserCelebrationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserCelebrationUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one UserCelebration.
     * @param {UserCelebrationUpsertArgs} args - Arguments to update or create a UserCelebration.
     * @example
     * // Update or create a UserCelebration
     * const userCelebration = await prisma.userCelebration.upsert({
     *   create: {
     *     // ... data to create a UserCelebration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCelebration we want to update
     *   }
     * })
     */
    upsert<T extends UserCelebrationUpsertArgs>(
      args: SelectSubset<T, UserCelebrationUpsertArgs<ExtArgs>>,
    ): Prisma__UserCelebrationClient<
      $Result.GetResult<
        Prisma.$UserCelebrationPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of UserCelebrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCelebrationCountArgs} args - Arguments to filter UserCelebrations to count.
     * @example
     * // Count the number of UserCelebrations
     * const count = await prisma.userCelebration.count({
     *   where: {
     *     // ... the filter for the UserCelebrations we want to count
     *   }
     * })
     **/
    count<T extends UserCelebrationCountArgs>(
      args?: Subset<T, UserCelebrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCelebrationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a UserCelebration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCelebrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserCelebrationAggregateArgs>(
      args: Subset<T, UserCelebrationAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserCelebrationAggregateType<T>>;

    /**
     * Group by UserCelebration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCelebrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserCelebrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCelebrationGroupByArgs["orderBy"] }
        : { orderBy?: UserCelebrationGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserCelebrationGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetUserCelebrationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserCelebration model
     */
    readonly fields: UserCelebrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCelebration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCelebrationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    celebrationMethod<T extends CelebrationMethodDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CelebrationMethodDefaultArgs<ExtArgs>>,
    ): Prisma__CelebrationMethodClient<
      | $Result.GetResult<
          Prisma.$CelebrationMethodPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the UserCelebration model
   */
  interface UserCelebrationFieldRefs {
    readonly id: FieldRef<"UserCelebration", "String">;
    readonly userId: FieldRef<"UserCelebration", "String">;
    readonly celebrationMethodId: FieldRef<"UserCelebration", "String">;
    readonly isDefault: FieldRef<"UserCelebration", "Boolean">;
    readonly useCount: FieldRef<"UserCelebration", "Int">;
  }

  // Custom InputTypes
  /**
   * UserCelebration findUnique
   */
  export type UserCelebrationFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * Filter, which UserCelebration to fetch.
     */
    where: UserCelebrationWhereUniqueInput;
  };

  /**
   * UserCelebration findUniqueOrThrow
   */
  export type UserCelebrationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * Filter, which UserCelebration to fetch.
     */
    where: UserCelebrationWhereUniqueInput;
  };

  /**
   * UserCelebration findFirst
   */
  export type UserCelebrationFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * Filter, which UserCelebration to fetch.
     */
    where?: UserCelebrationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserCelebrations to fetch.
     */
    orderBy?:
      | UserCelebrationOrderByWithRelationInput
      | UserCelebrationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserCelebrations.
     */
    cursor?: UserCelebrationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserCelebrations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserCelebrations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserCelebrations.
     */
    distinct?:
      | UserCelebrationScalarFieldEnum
      | UserCelebrationScalarFieldEnum[];
  };

  /**
   * UserCelebration findFirstOrThrow
   */
  export type UserCelebrationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * Filter, which UserCelebration to fetch.
     */
    where?: UserCelebrationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserCelebrations to fetch.
     */
    orderBy?:
      | UserCelebrationOrderByWithRelationInput
      | UserCelebrationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserCelebrations.
     */
    cursor?: UserCelebrationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserCelebrations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserCelebrations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserCelebrations.
     */
    distinct?:
      | UserCelebrationScalarFieldEnum
      | UserCelebrationScalarFieldEnum[];
  };

  /**
   * UserCelebration findMany
   */
  export type UserCelebrationFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * Filter, which UserCelebrations to fetch.
     */
    where?: UserCelebrationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserCelebrations to fetch.
     */
    orderBy?:
      | UserCelebrationOrderByWithRelationInput
      | UserCelebrationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserCelebrations.
     */
    cursor?: UserCelebrationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserCelebrations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserCelebrations.
     */
    skip?: number;
    distinct?:
      | UserCelebrationScalarFieldEnum
      | UserCelebrationScalarFieldEnum[];
  };

  /**
   * UserCelebration create
   */
  export type UserCelebrationCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserCelebration.
     */
    data: XOR<UserCelebrationCreateInput, UserCelebrationUncheckedCreateInput>;
  };

  /**
   * UserCelebration createMany
   */
  export type UserCelebrationCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many UserCelebrations.
     */
    data: UserCelebrationCreateManyInput | UserCelebrationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * UserCelebration createManyAndReturn
   */
  export type UserCelebrationCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * The data used to create many UserCelebrations.
     */
    data: UserCelebrationCreateManyInput | UserCelebrationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserCelebration update
   */
  export type UserCelebrationUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserCelebration.
     */
    data: XOR<UserCelebrationUpdateInput, UserCelebrationUncheckedUpdateInput>;
    /**
     * Choose, which UserCelebration to update.
     */
    where: UserCelebrationWhereUniqueInput;
  };

  /**
   * UserCelebration updateMany
   */
  export type UserCelebrationUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update UserCelebrations.
     */
    data: XOR<
      UserCelebrationUpdateManyMutationInput,
      UserCelebrationUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserCelebrations to update
     */
    where?: UserCelebrationWhereInput;
    /**
     * Limit how many UserCelebrations to update.
     */
    limit?: number;
  };

  /**
   * UserCelebration updateManyAndReturn
   */
  export type UserCelebrationUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * The data used to update UserCelebrations.
     */
    data: XOR<
      UserCelebrationUpdateManyMutationInput,
      UserCelebrationUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserCelebrations to update
     */
    where?: UserCelebrationWhereInput;
    /**
     * Limit how many UserCelebrations to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserCelebration upsert
   */
  export type UserCelebrationUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserCelebration to update in case it exists.
     */
    where: UserCelebrationWhereUniqueInput;
    /**
     * In case the UserCelebration found by the `where` argument doesn't exist, create a new UserCelebration with this data.
     */
    create: XOR<
      UserCelebrationCreateInput,
      UserCelebrationUncheckedCreateInput
    >;
    /**
     * In case the UserCelebration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      UserCelebrationUpdateInput,
      UserCelebrationUncheckedUpdateInput
    >;
  };

  /**
   * UserCelebration delete
   */
  export type UserCelebrationDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
    /**
     * Filter which UserCelebration to delete.
     */
    where: UserCelebrationWhereUniqueInput;
  };

  /**
   * UserCelebration deleteMany
   */
  export type UserCelebrationDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserCelebrations to delete
     */
    where?: UserCelebrationWhereInput;
    /**
     * Limit how many UserCelebrations to delete.
     */
    limit?: number;
  };

  /**
   * UserCelebration without action
   */
  export type UserCelebrationDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCelebration
     */
    select?: UserCelebrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserCelebration
     */
    omit?: UserCelebrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCelebrationInclude<ExtArgs> | null;
  };

  /**
   * Model DailyRoutine
   */

  export type AggregateDailyRoutine = {
    _count: DailyRoutineCountAggregateOutputType | null;
    _min: DailyRoutineMinAggregateOutputType | null;
    _max: DailyRoutineMaxAggregateOutputType | null;
  };

  export type DailyRoutineMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DailyRoutineMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DailyRoutineCountAggregateOutputType = {
    id: number;
    userId: number;
    activities: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type DailyRoutineMinAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DailyRoutineMaxAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DailyRoutineCountAggregateInputType = {
    id?: true;
    userId?: true;
    activities?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type DailyRoutineAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which DailyRoutine to aggregate.
     */
    where?: DailyRoutineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyRoutines to fetch.
     */
    orderBy?:
      | DailyRoutineOrderByWithRelationInput
      | DailyRoutineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: DailyRoutineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyRoutines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyRoutines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DailyRoutines
     **/
    _count?: true | DailyRoutineCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DailyRoutineMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DailyRoutineMaxAggregateInputType;
  };

  export type GetDailyRoutineAggregateType<
    T extends DailyRoutineAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateDailyRoutine]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyRoutine[P]>
      : GetScalarType<T[P], AggregateDailyRoutine[P]>;
  };

  export type DailyRoutineGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: DailyRoutineWhereInput;
    orderBy?:
      | DailyRoutineOrderByWithAggregationInput
      | DailyRoutineOrderByWithAggregationInput[];
    by: DailyRoutineScalarFieldEnum[] | DailyRoutineScalarFieldEnum;
    having?: DailyRoutineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DailyRoutineCountAggregateInputType | true;
    _min?: DailyRoutineMinAggregateInputType;
    _max?: DailyRoutineMaxAggregateInputType;
  };

  export type DailyRoutineGroupByOutputType = {
    id: string;
    userId: string;
    activities: JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: DailyRoutineCountAggregateOutputType | null;
    _min: DailyRoutineMinAggregateOutputType | null;
    _max: DailyRoutineMaxAggregateOutputType | null;
  };

  type GetDailyRoutineGroupByPayload<T extends DailyRoutineGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<DailyRoutineGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof DailyRoutineGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyRoutineGroupByOutputType[P]>
            : GetScalarType<T[P], DailyRoutineGroupByOutputType[P]>;
        }
      >
    >;

  export type DailyRoutineSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      activities?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["dailyRoutine"]
  >;

  export type DailyRoutineSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      activities?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["dailyRoutine"]
  >;

  export type DailyRoutineSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      activities?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["dailyRoutine"]
  >;

  export type DailyRoutineSelectScalar = {
    id?: boolean;
    userId?: boolean;
    activities?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type DailyRoutineOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "userId" | "activities" | "createdAt" | "updatedAt",
    ExtArgs["result"]["dailyRoutine"]
  >;
  export type DailyRoutineInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type DailyRoutineIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type DailyRoutineIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $DailyRoutinePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "DailyRoutine";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        activities: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["dailyRoutine"]
    >;
    composites: {};
  };

  type DailyRoutineGetPayload<
    S extends boolean | null | undefined | DailyRoutineDefaultArgs,
  > = $Result.GetResult<Prisma.$DailyRoutinePayload, S>;

  type DailyRoutineCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    DailyRoutineFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: DailyRoutineCountAggregateInputType | true;
  };

  export interface DailyRoutineDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["DailyRoutine"];
      meta: { name: "DailyRoutine" };
    };
    /**
     * Find zero or one DailyRoutine that matches the filter.
     * @param {DailyRoutineFindUniqueArgs} args - Arguments to find a DailyRoutine
     * @example
     * // Get one DailyRoutine
     * const dailyRoutine = await prisma.dailyRoutine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyRoutineFindUniqueArgs>(
      args: SelectSubset<T, DailyRoutineFindUniqueArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one DailyRoutine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyRoutineFindUniqueOrThrowArgs} args - Arguments to find a DailyRoutine
     * @example
     * // Get one DailyRoutine
     * const dailyRoutine = await prisma.dailyRoutine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyRoutineFindUniqueOrThrowArgs>(
      args: SelectSubset<T, DailyRoutineFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first DailyRoutine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRoutineFindFirstArgs} args - Arguments to find a DailyRoutine
     * @example
     * // Get one DailyRoutine
     * const dailyRoutine = await prisma.dailyRoutine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyRoutineFindFirstArgs>(
      args?: SelectSubset<T, DailyRoutineFindFirstArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first DailyRoutine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRoutineFindFirstOrThrowArgs} args - Arguments to find a DailyRoutine
     * @example
     * // Get one DailyRoutine
     * const dailyRoutine = await prisma.dailyRoutine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyRoutineFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DailyRoutineFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more DailyRoutines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRoutineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyRoutines
     * const dailyRoutines = await prisma.dailyRoutine.findMany()
     *
     * // Get first 10 DailyRoutines
     * const dailyRoutines = await prisma.dailyRoutine.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const dailyRoutineWithIdOnly = await prisma.dailyRoutine.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DailyRoutineFindManyArgs>(
      args?: SelectSubset<T, DailyRoutineFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a DailyRoutine.
     * @param {DailyRoutineCreateArgs} args - Arguments to create a DailyRoutine.
     * @example
     * // Create one DailyRoutine
     * const DailyRoutine = await prisma.dailyRoutine.create({
     *   data: {
     *     // ... data to create a DailyRoutine
     *   }
     * })
     *
     */
    create<T extends DailyRoutineCreateArgs>(
      args: SelectSubset<T, DailyRoutineCreateArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many DailyRoutines.
     * @param {DailyRoutineCreateManyArgs} args - Arguments to create many DailyRoutines.
     * @example
     * // Create many DailyRoutines
     * const dailyRoutine = await prisma.dailyRoutine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DailyRoutineCreateManyArgs>(
      args?: SelectSubset<T, DailyRoutineCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many DailyRoutines and returns the data saved in the database.
     * @param {DailyRoutineCreateManyAndReturnArgs} args - Arguments to create many DailyRoutines.
     * @example
     * // Create many DailyRoutines
     * const dailyRoutine = await prisma.dailyRoutine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DailyRoutines and only return the `id`
     * const dailyRoutineWithIdOnly = await prisma.dailyRoutine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DailyRoutineCreateManyAndReturnArgs>(
      args?: SelectSubset<T, DailyRoutineCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a DailyRoutine.
     * @param {DailyRoutineDeleteArgs} args - Arguments to delete one DailyRoutine.
     * @example
     * // Delete one DailyRoutine
     * const DailyRoutine = await prisma.dailyRoutine.delete({
     *   where: {
     *     // ... filter to delete one DailyRoutine
     *   }
     * })
     *
     */
    delete<T extends DailyRoutineDeleteArgs>(
      args: SelectSubset<T, DailyRoutineDeleteArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one DailyRoutine.
     * @param {DailyRoutineUpdateArgs} args - Arguments to update one DailyRoutine.
     * @example
     * // Update one DailyRoutine
     * const dailyRoutine = await prisma.dailyRoutine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DailyRoutineUpdateArgs>(
      args: SelectSubset<T, DailyRoutineUpdateArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more DailyRoutines.
     * @param {DailyRoutineDeleteManyArgs} args - Arguments to filter DailyRoutines to delete.
     * @example
     * // Delete a few DailyRoutines
     * const { count } = await prisma.dailyRoutine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DailyRoutineDeleteManyArgs>(
      args?: SelectSubset<T, DailyRoutineDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more DailyRoutines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRoutineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyRoutines
     * const dailyRoutine = await prisma.dailyRoutine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DailyRoutineUpdateManyArgs>(
      args: SelectSubset<T, DailyRoutineUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more DailyRoutines and returns the data updated in the database.
     * @param {DailyRoutineUpdateManyAndReturnArgs} args - Arguments to update many DailyRoutines.
     * @example
     * // Update many DailyRoutines
     * const dailyRoutine = await prisma.dailyRoutine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DailyRoutines and only return the `id`
     * const dailyRoutineWithIdOnly = await prisma.dailyRoutine.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DailyRoutineUpdateManyAndReturnArgs>(
      args: SelectSubset<T, DailyRoutineUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one DailyRoutine.
     * @param {DailyRoutineUpsertArgs} args - Arguments to update or create a DailyRoutine.
     * @example
     * // Update or create a DailyRoutine
     * const dailyRoutine = await prisma.dailyRoutine.upsert({
     *   create: {
     *     // ... data to create a DailyRoutine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyRoutine we want to update
     *   }
     * })
     */
    upsert<T extends DailyRoutineUpsertArgs>(
      args: SelectSubset<T, DailyRoutineUpsertArgs<ExtArgs>>,
    ): Prisma__DailyRoutineClient<
      $Result.GetResult<
        Prisma.$DailyRoutinePayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of DailyRoutines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRoutineCountArgs} args - Arguments to filter DailyRoutines to count.
     * @example
     * // Count the number of DailyRoutines
     * const count = await prisma.dailyRoutine.count({
     *   where: {
     *     // ... the filter for the DailyRoutines we want to count
     *   }
     * })
     **/
    count<T extends DailyRoutineCountArgs>(
      args?: Subset<T, DailyRoutineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], DailyRoutineCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a DailyRoutine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRoutineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends DailyRoutineAggregateArgs>(
      args: Subset<T, DailyRoutineAggregateArgs>,
    ): Prisma.PrismaPromise<GetDailyRoutineAggregateType<T>>;

    /**
     * Group by DailyRoutine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRoutineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends DailyRoutineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyRoutineGroupByArgs["orderBy"] }
        : { orderBy?: DailyRoutineGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, DailyRoutineGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetDailyRoutineGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DailyRoutine model
     */
    readonly fields: DailyRoutineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyRoutine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyRoutineClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the DailyRoutine model
   */
  interface DailyRoutineFieldRefs {
    readonly id: FieldRef<"DailyRoutine", "String">;
    readonly userId: FieldRef<"DailyRoutine", "String">;
    readonly activities: FieldRef<"DailyRoutine", "Json">;
    readonly createdAt: FieldRef<"DailyRoutine", "DateTime">;
    readonly updatedAt: FieldRef<"DailyRoutine", "DateTime">;
  }

  // Custom InputTypes
  /**
   * DailyRoutine findUnique
   */
  export type DailyRoutineFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * Filter, which DailyRoutine to fetch.
     */
    where: DailyRoutineWhereUniqueInput;
  };

  /**
   * DailyRoutine findUniqueOrThrow
   */
  export type DailyRoutineFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * Filter, which DailyRoutine to fetch.
     */
    where: DailyRoutineWhereUniqueInput;
  };

  /**
   * DailyRoutine findFirst
   */
  export type DailyRoutineFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * Filter, which DailyRoutine to fetch.
     */
    where?: DailyRoutineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyRoutines to fetch.
     */
    orderBy?:
      | DailyRoutineOrderByWithRelationInput
      | DailyRoutineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DailyRoutines.
     */
    cursor?: DailyRoutineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyRoutines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyRoutines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DailyRoutines.
     */
    distinct?: DailyRoutineScalarFieldEnum | DailyRoutineScalarFieldEnum[];
  };

  /**
   * DailyRoutine findFirstOrThrow
   */
  export type DailyRoutineFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * Filter, which DailyRoutine to fetch.
     */
    where?: DailyRoutineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyRoutines to fetch.
     */
    orderBy?:
      | DailyRoutineOrderByWithRelationInput
      | DailyRoutineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DailyRoutines.
     */
    cursor?: DailyRoutineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyRoutines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyRoutines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DailyRoutines.
     */
    distinct?: DailyRoutineScalarFieldEnum | DailyRoutineScalarFieldEnum[];
  };

  /**
   * DailyRoutine findMany
   */
  export type DailyRoutineFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * Filter, which DailyRoutines to fetch.
     */
    where?: DailyRoutineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyRoutines to fetch.
     */
    orderBy?:
      | DailyRoutineOrderByWithRelationInput
      | DailyRoutineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DailyRoutines.
     */
    cursor?: DailyRoutineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyRoutines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyRoutines.
     */
    skip?: number;
    distinct?: DailyRoutineScalarFieldEnum | DailyRoutineScalarFieldEnum[];
  };

  /**
   * DailyRoutine create
   */
  export type DailyRoutineCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * The data needed to create a DailyRoutine.
     */
    data: XOR<DailyRoutineCreateInput, DailyRoutineUncheckedCreateInput>;
  };

  /**
   * DailyRoutine createMany
   */
  export type DailyRoutineCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many DailyRoutines.
     */
    data: DailyRoutineCreateManyInput | DailyRoutineCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * DailyRoutine createManyAndReturn
   */
  export type DailyRoutineCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * The data used to create many DailyRoutines.
     */
    data: DailyRoutineCreateManyInput | DailyRoutineCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * DailyRoutine update
   */
  export type DailyRoutineUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * The data needed to update a DailyRoutine.
     */
    data: XOR<DailyRoutineUpdateInput, DailyRoutineUncheckedUpdateInput>;
    /**
     * Choose, which DailyRoutine to update.
     */
    where: DailyRoutineWhereUniqueInput;
  };

  /**
   * DailyRoutine updateMany
   */
  export type DailyRoutineUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update DailyRoutines.
     */
    data: XOR<
      DailyRoutineUpdateManyMutationInput,
      DailyRoutineUncheckedUpdateManyInput
    >;
    /**
     * Filter which DailyRoutines to update
     */
    where?: DailyRoutineWhereInput;
    /**
     * Limit how many DailyRoutines to update.
     */
    limit?: number;
  };

  /**
   * DailyRoutine updateManyAndReturn
   */
  export type DailyRoutineUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * The data used to update DailyRoutines.
     */
    data: XOR<
      DailyRoutineUpdateManyMutationInput,
      DailyRoutineUncheckedUpdateManyInput
    >;
    /**
     * Filter which DailyRoutines to update
     */
    where?: DailyRoutineWhereInput;
    /**
     * Limit how many DailyRoutines to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * DailyRoutine upsert
   */
  export type DailyRoutineUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * The filter to search for the DailyRoutine to update in case it exists.
     */
    where: DailyRoutineWhereUniqueInput;
    /**
     * In case the DailyRoutine found by the `where` argument doesn't exist, create a new DailyRoutine with this data.
     */
    create: XOR<DailyRoutineCreateInput, DailyRoutineUncheckedCreateInput>;
    /**
     * In case the DailyRoutine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyRoutineUpdateInput, DailyRoutineUncheckedUpdateInput>;
  };

  /**
   * DailyRoutine delete
   */
  export type DailyRoutineDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
    /**
     * Filter which DailyRoutine to delete.
     */
    where: DailyRoutineWhereUniqueInput;
  };

  /**
   * DailyRoutine deleteMany
   */
  export type DailyRoutineDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which DailyRoutines to delete
     */
    where?: DailyRoutineWhereInput;
    /**
     * Limit how many DailyRoutines to delete.
     */
    limit?: number;
  };

  /**
   * DailyRoutine without action
   */
  export type DailyRoutineDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DailyRoutine
     */
    select?: DailyRoutineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyRoutine
     */
    omit?: DailyRoutineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyRoutineInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const AccountScalarFieldEnum: {
    id: "id";
    userId: "userId";
    type: "type";
    provider: "provider";
    providerAccountId: "providerAccountId";
    refresh_token: "refresh_token";
    access_token: "access_token";
    expires_at: "expires_at";
    token_type: "token_type";
    scope: "scope";
    id_token: "id_token";
    session_state: "session_state";
    refresh_token_expires_in: "refresh_token_expires_in";
  };

  export type AccountScalarFieldEnum =
    (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];

  export const SessionScalarFieldEnum: {
    id: "id";
    sessionToken: "sessionToken";
    userId: "userId";
    expires: "expires";
  };

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const VerificationTokenScalarFieldEnum: {
    identifier: "identifier";
    token: "token";
    expires: "expires";
  };

  export type VerificationTokenScalarFieldEnum =
    (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum];

  export const UserScalarFieldEnum: {
    id: "id";
    name: "name";
    email: "email";
    emailVerified: "emailVerified";
    image: "image";
    preferences: "preferences";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const HabitScalarFieldEnum: {
    id: "id";
    userId: "userId";
    type: "type";
    name: "name";
    description: "description";
    category: "category";
    anchor: "anchor";
    behavior: "behavior";
    celebration: "celebration";
    aspirationId: "aspirationId";
    currentPhase: "currentPhase";
    status: "status";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type HabitScalarFieldEnum =
    (typeof HabitScalarFieldEnum)[keyof typeof HabitScalarFieldEnum];

  export const HabitLogScalarFieldEnum: {
    id: "id";
    habitId: "habitId";
    userId: "userId";
    loggedAt: "loggedAt";
    completed: "completed";
    completionLevel: "completionLevel";
    actualBehavior: "actualBehavior";
    wantedMore: "wantedMore";
    feltEasy: "feltEasy";
    shineScore: "shineScore";
    moodBefore: "moodBefore";
    moodAfter: "moodAfter";
    note: "note";
    createdAt: "createdAt";
  };

  export type HabitLogScalarFieldEnum =
    (typeof HabitLogScalarFieldEnum)[keyof typeof HabitLogScalarFieldEnum];

  export const AspirationScalarFieldEnum: {
    id: "id";
    userId: "userId";
    description: "description";
    clarified: "clarified";
    category: "category";
    status: "status";
    progress: "progress";
    explorationData: "explorationData";
    achievedAt: "achievedAt";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type AspirationScalarFieldEnum =
    (typeof AspirationScalarFieldEnum)[keyof typeof AspirationScalarFieldEnum];

  export const CelebrationMethodScalarFieldEnum: {
    id: "id";
    category: "category";
    content: "content";
    emoji: "emoji";
    isBuiltIn: "isBuiltIn";
  };

  export type CelebrationMethodScalarFieldEnum =
    (typeof CelebrationMethodScalarFieldEnum)[keyof typeof CelebrationMethodScalarFieldEnum];

  export const UserCelebrationScalarFieldEnum: {
    id: "id";
    userId: "userId";
    celebrationMethodId: "celebrationMethodId";
    isDefault: "isDefault";
    useCount: "useCount";
  };

  export type UserCelebrationScalarFieldEnum =
    (typeof UserCelebrationScalarFieldEnum)[keyof typeof UserCelebrationScalarFieldEnum];

  export const DailyRoutineScalarFieldEnum: {
    id: "id";
    userId: "userId";
    activities: "activities";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type DailyRoutineScalarFieldEnum =
    (typeof DailyRoutineScalarFieldEnum)[keyof typeof DailyRoutineScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Json"
  >;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "QueryMode"
  >;

  /**
   * Reference to a field of type 'HabitType'
   */
  export type EnumHabitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "HabitType"
  >;

  /**
   * Reference to a field of type 'HabitType[]'
   */
  export type ListEnumHabitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "HabitType[]"
  >;

  /**
   * Reference to a field of type 'HabitStatus'
   */
  export type EnumHabitStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "HabitStatus"
  >;

  /**
   * Reference to a field of type 'HabitStatus[]'
   */
  export type ListEnumHabitStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "HabitStatus[]">;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'CompletionLevel'
   */
  export type EnumCompletionLevelFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "CompletionLevel">;

  /**
   * Reference to a field of type 'CompletionLevel[]'
   */
  export type ListEnumCompletionLevelFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "CompletionLevel[]">;

  /**
   * Reference to a field of type 'AspirationStatus'
   */
  export type EnumAspirationStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "AspirationStatus">;

  /**
   * Reference to a field of type 'AspirationStatus[]'
   */
  export type ListEnumAspirationStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "AspirationStatus[]">;

  /**
   * Reference to a field of type 'CelebrationCategory'
   */
  export type EnumCelebrationCategoryFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "CelebrationCategory">;

  /**
   * Reference to a field of type 'CelebrationCategory[]'
   */
  export type ListEnumCelebrationCategoryFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "CelebrationCategory[]">;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Deep Input Types
   */

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[];
    OR?: AccountWhereInput[];
    NOT?: AccountWhereInput | AccountWhereInput[];
    id?: StringFilter<"Account"> | string;
    userId?: StringFilter<"Account"> | string;
    type?: StringFilter<"Account"> | string;
    provider?: StringFilter<"Account"> | string;
    providerAccountId?: StringFilter<"Account"> | string;
    refresh_token?: StringNullableFilter<"Account"> | string | null;
    access_token?: StringNullableFilter<"Account"> | string | null;
    expires_at?: IntNullableFilter<"Account"> | number | null;
    token_type?: StringNullableFilter<"Account"> | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    id_token?: StringNullableFilter<"Account"> | string | null;
    session_state?: StringNullableFilter<"Account"> | string | null;
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    refresh_token_expires_in?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AccountWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput;
      AND?: AccountWhereInput | AccountWhereInput[];
      OR?: AccountWhereInput[];
      NOT?: AccountWhereInput | AccountWhereInput[];
      userId?: StringFilter<"Account"> | string;
      type?: StringFilter<"Account"> | string;
      provider?: StringFilter<"Account"> | string;
      providerAccountId?: StringFilter<"Account"> | string;
      refresh_token?: StringNullableFilter<"Account"> | string | null;
      access_token?: StringNullableFilter<"Account"> | string | null;
      expires_at?: IntNullableFilter<"Account"> | number | null;
      token_type?: StringNullableFilter<"Account"> | string | null;
      scope?: StringNullableFilter<"Account"> | string | null;
      id_token?: StringNullableFilter<"Account"> | string | null;
      session_state?: StringNullableFilter<"Account"> | string | null;
      refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id" | "provider_providerAccountId"
  >;

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    refresh_token_expires_in?: SortOrderInput | SortOrder;
    _count?: AccountCountOrderByAggregateInput;
    _avg?: AccountAvgOrderByAggregateInput;
    _max?: AccountMaxOrderByAggregateInput;
    _min?: AccountMinOrderByAggregateInput;
    _sum?: AccountSumOrderByAggregateInput;
  };

  export type AccountScalarWhereWithAggregatesInput = {
    AND?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    OR?: AccountScalarWhereWithAggregatesInput[];
    NOT?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Account"> | string;
    userId?: StringWithAggregatesFilter<"Account"> | string;
    type?: StringWithAggregatesFilter<"Account"> | string;
    provider?: StringWithAggregatesFilter<"Account"> | string;
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string;
    refresh_token?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    access_token?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null;
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    session_state?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    refresh_token_expires_in?:
      | IntNullableWithAggregatesFilter<"Account">
      | number
      | null;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<"Session"> | string;
    sessionToken?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    expires?: DateTimeFilter<"Session"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sessionToken?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      userId?: StringFilter<"Session"> | string;
      expires?: DateTimeFilter<"Session"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id" | "sessionToken"
  >;

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Session"> | string;
    sessionToken?: StringWithAggregatesFilter<"Session"> | string;
    userId?: StringWithAggregatesFilter<"Session"> | string;
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
  };

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    OR?: VerificationTokenWhereInput[];
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    identifier?: StringFilter<"VerificationToken"> | string;
    token?: StringFilter<"VerificationToken"> | string;
    expires?: DateTimeFilter<"VerificationToken"> | Date | string;
  };

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<
    {
      token?: string;
      identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput;
      AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      OR?: VerificationTokenWhereInput[];
      NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      identifier?: StringFilter<"VerificationToken"> | string;
      expires?: DateTimeFilter<"VerificationToken"> | Date | string;
    },
    "token" | "identifier_token"
  >;

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    _count?: VerificationTokenCountOrderByAggregateInput;
    _max?: VerificationTokenMaxOrderByAggregateInput;
    _min?: VerificationTokenMinOrderByAggregateInput;
  };

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    OR?: VerificationTokenScalarWhereWithAggregatesInput[];
    NOT?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string;
    token?: StringWithAggregatesFilter<"VerificationToken"> | string;
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string;
  };

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    name?: StringNullableFilter<"User"> | string | null;
    email?: StringNullableFilter<"User"> | string | null;
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
    image?: StringNullableFilter<"User"> | string | null;
    preferences?: JsonNullableFilter<"User">;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    accounts?: AccountListRelationFilter;
    sessions?: SessionListRelationFilter;
    aspirations?: AspirationListRelationFilter;
    habits?: HabitListRelationFilter;
    habitLogs?: HabitLogListRelationFilter;
    routine?: XOR<
      DailyRoutineNullableScalarRelationFilter,
      DailyRoutineWhereInput
    > | null;
    celebrations?: UserCelebrationListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    preferences?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    accounts?: AccountOrderByRelationAggregateInput;
    sessions?: SessionOrderByRelationAggregateInput;
    aspirations?: AspirationOrderByRelationAggregateInput;
    habits?: HabitOrderByRelationAggregateInput;
    habitLogs?: HabitLogOrderByRelationAggregateInput;
    routine?: DailyRoutineOrderByWithRelationInput;
    celebrations?: UserCelebrationOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringNullableFilter<"User"> | string | null;
      emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
      image?: StringNullableFilter<"User"> | string | null;
      preferences?: JsonNullableFilter<"User">;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      accounts?: AccountListRelationFilter;
      sessions?: SessionListRelationFilter;
      aspirations?: AspirationListRelationFilter;
      habits?: HabitListRelationFilter;
      habitLogs?: HabitLogListRelationFilter;
      routine?: XOR<
        DailyRoutineNullableScalarRelationFilter,
        DailyRoutineWhereInput
      > | null;
      celebrations?: UserCelebrationListRelationFilter;
    },
    "id" | "email"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    preferences?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    name?: StringNullableWithAggregatesFilter<"User"> | string | null;
    email?: StringNullableWithAggregatesFilter<"User"> | string | null;
    emailVerified?:
      | DateTimeNullableWithAggregatesFilter<"User">
      | Date
      | string
      | null;
    image?: StringNullableWithAggregatesFilter<"User"> | string | null;
    preferences?: JsonNullableWithAggregatesFilter<"User">;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
  };

  export type HabitWhereInput = {
    AND?: HabitWhereInput | HabitWhereInput[];
    OR?: HabitWhereInput[];
    NOT?: HabitWhereInput | HabitWhereInput[];
    id?: StringFilter<"Habit"> | string;
    userId?: StringFilter<"Habit"> | string;
    type?: EnumHabitTypeFilter<"Habit"> | $Enums.HabitType;
    name?: StringFilter<"Habit"> | string;
    description?: StringNullableFilter<"Habit"> | string | null;
    category?: StringNullableFilter<"Habit"> | string | null;
    anchor?: StringNullableFilter<"Habit"> | string | null;
    behavior?: StringNullableFilter<"Habit"> | string | null;
    celebration?: StringNullableFilter<"Habit"> | string | null;
    aspirationId?: StringNullableFilter<"Habit"> | string | null;
    currentPhase?: IntFilter<"Habit"> | number;
    status?: EnumHabitStatusFilter<"Habit"> | $Enums.HabitStatus;
    createdAt?: DateTimeFilter<"Habit"> | Date | string;
    updatedAt?: DateTimeFilter<"Habit"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    aspiration?: XOR<
      AspirationNullableScalarRelationFilter,
      AspirationWhereInput
    > | null;
    logs?: HabitLogListRelationFilter;
  };

  export type HabitOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    category?: SortOrderInput | SortOrder;
    anchor?: SortOrderInput | SortOrder;
    behavior?: SortOrderInput | SortOrder;
    celebration?: SortOrderInput | SortOrder;
    aspirationId?: SortOrderInput | SortOrder;
    currentPhase?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    aspiration?: AspirationOrderByWithRelationInput;
    logs?: HabitLogOrderByRelationAggregateInput;
  };

  export type HabitWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: HabitWhereInput | HabitWhereInput[];
      OR?: HabitWhereInput[];
      NOT?: HabitWhereInput | HabitWhereInput[];
      userId?: StringFilter<"Habit"> | string;
      type?: EnumHabitTypeFilter<"Habit"> | $Enums.HabitType;
      name?: StringFilter<"Habit"> | string;
      description?: StringNullableFilter<"Habit"> | string | null;
      category?: StringNullableFilter<"Habit"> | string | null;
      anchor?: StringNullableFilter<"Habit"> | string | null;
      behavior?: StringNullableFilter<"Habit"> | string | null;
      celebration?: StringNullableFilter<"Habit"> | string | null;
      aspirationId?: StringNullableFilter<"Habit"> | string | null;
      currentPhase?: IntFilter<"Habit"> | number;
      status?: EnumHabitStatusFilter<"Habit"> | $Enums.HabitStatus;
      createdAt?: DateTimeFilter<"Habit"> | Date | string;
      updatedAt?: DateTimeFilter<"Habit"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      aspiration?: XOR<
        AspirationNullableScalarRelationFilter,
        AspirationWhereInput
      > | null;
      logs?: HabitLogListRelationFilter;
    },
    "id"
  >;

  export type HabitOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    category?: SortOrderInput | SortOrder;
    anchor?: SortOrderInput | SortOrder;
    behavior?: SortOrderInput | SortOrder;
    celebration?: SortOrderInput | SortOrder;
    aspirationId?: SortOrderInput | SortOrder;
    currentPhase?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: HabitCountOrderByAggregateInput;
    _avg?: HabitAvgOrderByAggregateInput;
    _max?: HabitMaxOrderByAggregateInput;
    _min?: HabitMinOrderByAggregateInput;
    _sum?: HabitSumOrderByAggregateInput;
  };

  export type HabitScalarWhereWithAggregatesInput = {
    AND?:
      | HabitScalarWhereWithAggregatesInput
      | HabitScalarWhereWithAggregatesInput[];
    OR?: HabitScalarWhereWithAggregatesInput[];
    NOT?:
      | HabitScalarWhereWithAggregatesInput
      | HabitScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Habit"> | string;
    userId?: StringWithAggregatesFilter<"Habit"> | string;
    type?: EnumHabitTypeWithAggregatesFilter<"Habit"> | $Enums.HabitType;
    name?: StringWithAggregatesFilter<"Habit"> | string;
    description?: StringNullableWithAggregatesFilter<"Habit"> | string | null;
    category?: StringNullableWithAggregatesFilter<"Habit"> | string | null;
    anchor?: StringNullableWithAggregatesFilter<"Habit"> | string | null;
    behavior?: StringNullableWithAggregatesFilter<"Habit"> | string | null;
    celebration?: StringNullableWithAggregatesFilter<"Habit"> | string | null;
    aspirationId?: StringNullableWithAggregatesFilter<"Habit"> | string | null;
    currentPhase?: IntWithAggregatesFilter<"Habit"> | number;
    status?: EnumHabitStatusWithAggregatesFilter<"Habit"> | $Enums.HabitStatus;
    createdAt?: DateTimeWithAggregatesFilter<"Habit"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Habit"> | Date | string;
  };

  export type HabitLogWhereInput = {
    AND?: HabitLogWhereInput | HabitLogWhereInput[];
    OR?: HabitLogWhereInput[];
    NOT?: HabitLogWhereInput | HabitLogWhereInput[];
    id?: StringFilter<"HabitLog"> | string;
    habitId?: StringFilter<"HabitLog"> | string;
    userId?: StringFilter<"HabitLog"> | string;
    loggedAt?: DateTimeFilter<"HabitLog"> | Date | string;
    completed?: BoolFilter<"HabitLog"> | boolean;
    completionLevel?:
      | EnumCompletionLevelFilter<"HabitLog">
      | $Enums.CompletionLevel;
    actualBehavior?: StringNullableFilter<"HabitLog"> | string | null;
    wantedMore?: BoolNullableFilter<"HabitLog"> | boolean | null;
    feltEasy?: BoolNullableFilter<"HabitLog"> | boolean | null;
    shineScore?: IntNullableFilter<"HabitLog"> | number | null;
    moodBefore?: IntNullableFilter<"HabitLog"> | number | null;
    moodAfter?: IntNullableFilter<"HabitLog"> | number | null;
    note?: StringNullableFilter<"HabitLog"> | string | null;
    createdAt?: DateTimeFilter<"HabitLog"> | Date | string;
    habit?: XOR<HabitScalarRelationFilter, HabitWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type HabitLogOrderByWithRelationInput = {
    id?: SortOrder;
    habitId?: SortOrder;
    userId?: SortOrder;
    loggedAt?: SortOrder;
    completed?: SortOrder;
    completionLevel?: SortOrder;
    actualBehavior?: SortOrderInput | SortOrder;
    wantedMore?: SortOrderInput | SortOrder;
    feltEasy?: SortOrderInput | SortOrder;
    shineScore?: SortOrderInput | SortOrder;
    moodBefore?: SortOrderInput | SortOrder;
    moodAfter?: SortOrderInput | SortOrder;
    note?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    habit?: HabitOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type HabitLogWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      habitId_loggedAt?: HabitLogHabitIdLoggedAtCompoundUniqueInput;
      AND?: HabitLogWhereInput | HabitLogWhereInput[];
      OR?: HabitLogWhereInput[];
      NOT?: HabitLogWhereInput | HabitLogWhereInput[];
      habitId?: StringFilter<"HabitLog"> | string;
      userId?: StringFilter<"HabitLog"> | string;
      loggedAt?: DateTimeFilter<"HabitLog"> | Date | string;
      completed?: BoolFilter<"HabitLog"> | boolean;
      completionLevel?:
        | EnumCompletionLevelFilter<"HabitLog">
        | $Enums.CompletionLevel;
      actualBehavior?: StringNullableFilter<"HabitLog"> | string | null;
      wantedMore?: BoolNullableFilter<"HabitLog"> | boolean | null;
      feltEasy?: BoolNullableFilter<"HabitLog"> | boolean | null;
      shineScore?: IntNullableFilter<"HabitLog"> | number | null;
      moodBefore?: IntNullableFilter<"HabitLog"> | number | null;
      moodAfter?: IntNullableFilter<"HabitLog"> | number | null;
      note?: StringNullableFilter<"HabitLog"> | string | null;
      createdAt?: DateTimeFilter<"HabitLog"> | Date | string;
      habit?: XOR<HabitScalarRelationFilter, HabitWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id" | "habitId_loggedAt"
  >;

  export type HabitLogOrderByWithAggregationInput = {
    id?: SortOrder;
    habitId?: SortOrder;
    userId?: SortOrder;
    loggedAt?: SortOrder;
    completed?: SortOrder;
    completionLevel?: SortOrder;
    actualBehavior?: SortOrderInput | SortOrder;
    wantedMore?: SortOrderInput | SortOrder;
    feltEasy?: SortOrderInput | SortOrder;
    shineScore?: SortOrderInput | SortOrder;
    moodBefore?: SortOrderInput | SortOrder;
    moodAfter?: SortOrderInput | SortOrder;
    note?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: HabitLogCountOrderByAggregateInput;
    _avg?: HabitLogAvgOrderByAggregateInput;
    _max?: HabitLogMaxOrderByAggregateInput;
    _min?: HabitLogMinOrderByAggregateInput;
    _sum?: HabitLogSumOrderByAggregateInput;
  };

  export type HabitLogScalarWhereWithAggregatesInput = {
    AND?:
      | HabitLogScalarWhereWithAggregatesInput
      | HabitLogScalarWhereWithAggregatesInput[];
    OR?: HabitLogScalarWhereWithAggregatesInput[];
    NOT?:
      | HabitLogScalarWhereWithAggregatesInput
      | HabitLogScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"HabitLog"> | string;
    habitId?: StringWithAggregatesFilter<"HabitLog"> | string;
    userId?: StringWithAggregatesFilter<"HabitLog"> | string;
    loggedAt?: DateTimeWithAggregatesFilter<"HabitLog"> | Date | string;
    completed?: BoolWithAggregatesFilter<"HabitLog"> | boolean;
    completionLevel?:
      | EnumCompletionLevelWithAggregatesFilter<"HabitLog">
      | $Enums.CompletionLevel;
    actualBehavior?:
      | StringNullableWithAggregatesFilter<"HabitLog">
      | string
      | null;
    wantedMore?: BoolNullableWithAggregatesFilter<"HabitLog"> | boolean | null;
    feltEasy?: BoolNullableWithAggregatesFilter<"HabitLog"> | boolean | null;
    shineScore?: IntNullableWithAggregatesFilter<"HabitLog"> | number | null;
    moodBefore?: IntNullableWithAggregatesFilter<"HabitLog"> | number | null;
    moodAfter?: IntNullableWithAggregatesFilter<"HabitLog"> | number | null;
    note?: StringNullableWithAggregatesFilter<"HabitLog"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"HabitLog"> | Date | string;
  };

  export type AspirationWhereInput = {
    AND?: AspirationWhereInput | AspirationWhereInput[];
    OR?: AspirationWhereInput[];
    NOT?: AspirationWhereInput | AspirationWhereInput[];
    id?: StringFilter<"Aspiration"> | string;
    userId?: StringFilter<"Aspiration"> | string;
    description?: StringFilter<"Aspiration"> | string;
    clarified?: StringNullableFilter<"Aspiration"> | string | null;
    category?: StringNullableFilter<"Aspiration"> | string | null;
    status?: EnumAspirationStatusFilter<"Aspiration"> | $Enums.AspirationStatus;
    progress?: IntFilter<"Aspiration"> | number;
    explorationData?: JsonNullableFilter<"Aspiration">;
    achievedAt?: DateTimeNullableFilter<"Aspiration"> | Date | string | null;
    createdAt?: DateTimeFilter<"Aspiration"> | Date | string;
    updatedAt?: DateTimeFilter<"Aspiration"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    habits?: HabitListRelationFilter;
  };

  export type AspirationOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    description?: SortOrder;
    clarified?: SortOrderInput | SortOrder;
    category?: SortOrderInput | SortOrder;
    status?: SortOrder;
    progress?: SortOrder;
    explorationData?: SortOrderInput | SortOrder;
    achievedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    habits?: HabitOrderByRelationAggregateInput;
  };

  export type AspirationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AspirationWhereInput | AspirationWhereInput[];
      OR?: AspirationWhereInput[];
      NOT?: AspirationWhereInput | AspirationWhereInput[];
      userId?: StringFilter<"Aspiration"> | string;
      description?: StringFilter<"Aspiration"> | string;
      clarified?: StringNullableFilter<"Aspiration"> | string | null;
      category?: StringNullableFilter<"Aspiration"> | string | null;
      status?:
        | EnumAspirationStatusFilter<"Aspiration">
        | $Enums.AspirationStatus;
      progress?: IntFilter<"Aspiration"> | number;
      explorationData?: JsonNullableFilter<"Aspiration">;
      achievedAt?: DateTimeNullableFilter<"Aspiration"> | Date | string | null;
      createdAt?: DateTimeFilter<"Aspiration"> | Date | string;
      updatedAt?: DateTimeFilter<"Aspiration"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      habits?: HabitListRelationFilter;
    },
    "id"
  >;

  export type AspirationOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    description?: SortOrder;
    clarified?: SortOrderInput | SortOrder;
    category?: SortOrderInput | SortOrder;
    status?: SortOrder;
    progress?: SortOrder;
    explorationData?: SortOrderInput | SortOrder;
    achievedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AspirationCountOrderByAggregateInput;
    _avg?: AspirationAvgOrderByAggregateInput;
    _max?: AspirationMaxOrderByAggregateInput;
    _min?: AspirationMinOrderByAggregateInput;
    _sum?: AspirationSumOrderByAggregateInput;
  };

  export type AspirationScalarWhereWithAggregatesInput = {
    AND?:
      | AspirationScalarWhereWithAggregatesInput
      | AspirationScalarWhereWithAggregatesInput[];
    OR?: AspirationScalarWhereWithAggregatesInput[];
    NOT?:
      | AspirationScalarWhereWithAggregatesInput
      | AspirationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Aspiration"> | string;
    userId?: StringWithAggregatesFilter<"Aspiration"> | string;
    description?: StringWithAggregatesFilter<"Aspiration"> | string;
    clarified?:
      | StringNullableWithAggregatesFilter<"Aspiration">
      | string
      | null;
    category?: StringNullableWithAggregatesFilter<"Aspiration"> | string | null;
    status?:
      | EnumAspirationStatusWithAggregatesFilter<"Aspiration">
      | $Enums.AspirationStatus;
    progress?: IntWithAggregatesFilter<"Aspiration"> | number;
    explorationData?: JsonNullableWithAggregatesFilter<"Aspiration">;
    achievedAt?:
      | DateTimeNullableWithAggregatesFilter<"Aspiration">
      | Date
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Aspiration"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Aspiration"> | Date | string;
  };

  export type CelebrationMethodWhereInput = {
    AND?: CelebrationMethodWhereInput | CelebrationMethodWhereInput[];
    OR?: CelebrationMethodWhereInput[];
    NOT?: CelebrationMethodWhereInput | CelebrationMethodWhereInput[];
    id?: StringFilter<"CelebrationMethod"> | string;
    category?:
      | EnumCelebrationCategoryFilter<"CelebrationMethod">
      | $Enums.CelebrationCategory;
    content?: StringFilter<"CelebrationMethod"> | string;
    emoji?: StringNullableFilter<"CelebrationMethod"> | string | null;
    isBuiltIn?: BoolFilter<"CelebrationMethod"> | boolean;
    userFavorites?: UserCelebrationListRelationFilter;
  };

  export type CelebrationMethodOrderByWithRelationInput = {
    id?: SortOrder;
    category?: SortOrder;
    content?: SortOrder;
    emoji?: SortOrderInput | SortOrder;
    isBuiltIn?: SortOrder;
    userFavorites?: UserCelebrationOrderByRelationAggregateInput;
  };

  export type CelebrationMethodWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: CelebrationMethodWhereInput | CelebrationMethodWhereInput[];
      OR?: CelebrationMethodWhereInput[];
      NOT?: CelebrationMethodWhereInput | CelebrationMethodWhereInput[];
      category?:
        | EnumCelebrationCategoryFilter<"CelebrationMethod">
        | $Enums.CelebrationCategory;
      content?: StringFilter<"CelebrationMethod"> | string;
      emoji?: StringNullableFilter<"CelebrationMethod"> | string | null;
      isBuiltIn?: BoolFilter<"CelebrationMethod"> | boolean;
      userFavorites?: UserCelebrationListRelationFilter;
    },
    "id"
  >;

  export type CelebrationMethodOrderByWithAggregationInput = {
    id?: SortOrder;
    category?: SortOrder;
    content?: SortOrder;
    emoji?: SortOrderInput | SortOrder;
    isBuiltIn?: SortOrder;
    _count?: CelebrationMethodCountOrderByAggregateInput;
    _max?: CelebrationMethodMaxOrderByAggregateInput;
    _min?: CelebrationMethodMinOrderByAggregateInput;
  };

  export type CelebrationMethodScalarWhereWithAggregatesInput = {
    AND?:
      | CelebrationMethodScalarWhereWithAggregatesInput
      | CelebrationMethodScalarWhereWithAggregatesInput[];
    OR?: CelebrationMethodScalarWhereWithAggregatesInput[];
    NOT?:
      | CelebrationMethodScalarWhereWithAggregatesInput
      | CelebrationMethodScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"CelebrationMethod"> | string;
    category?:
      | EnumCelebrationCategoryWithAggregatesFilter<"CelebrationMethod">
      | $Enums.CelebrationCategory;
    content?: StringWithAggregatesFilter<"CelebrationMethod"> | string;
    emoji?:
      | StringNullableWithAggregatesFilter<"CelebrationMethod">
      | string
      | null;
    isBuiltIn?: BoolWithAggregatesFilter<"CelebrationMethod"> | boolean;
  };

  export type UserCelebrationWhereInput = {
    AND?: UserCelebrationWhereInput | UserCelebrationWhereInput[];
    OR?: UserCelebrationWhereInput[];
    NOT?: UserCelebrationWhereInput | UserCelebrationWhereInput[];
    id?: StringFilter<"UserCelebration"> | string;
    userId?: StringFilter<"UserCelebration"> | string;
    celebrationMethodId?: StringFilter<"UserCelebration"> | string;
    isDefault?: BoolFilter<"UserCelebration"> | boolean;
    useCount?: IntFilter<"UserCelebration"> | number;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    celebrationMethod?: XOR<
      CelebrationMethodScalarRelationFilter,
      CelebrationMethodWhereInput
    >;
  };

  export type UserCelebrationOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    celebrationMethodId?: SortOrder;
    isDefault?: SortOrder;
    useCount?: SortOrder;
    user?: UserOrderByWithRelationInput;
    celebrationMethod?: CelebrationMethodOrderByWithRelationInput;
  };

  export type UserCelebrationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      userId_celebrationMethodId?: UserCelebrationUserIdCelebrationMethodIdCompoundUniqueInput;
      AND?: UserCelebrationWhereInput | UserCelebrationWhereInput[];
      OR?: UserCelebrationWhereInput[];
      NOT?: UserCelebrationWhereInput | UserCelebrationWhereInput[];
      userId?: StringFilter<"UserCelebration"> | string;
      celebrationMethodId?: StringFilter<"UserCelebration"> | string;
      isDefault?: BoolFilter<"UserCelebration"> | boolean;
      useCount?: IntFilter<"UserCelebration"> | number;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      celebrationMethod?: XOR<
        CelebrationMethodScalarRelationFilter,
        CelebrationMethodWhereInput
      >;
    },
    "id" | "userId_celebrationMethodId"
  >;

  export type UserCelebrationOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    celebrationMethodId?: SortOrder;
    isDefault?: SortOrder;
    useCount?: SortOrder;
    _count?: UserCelebrationCountOrderByAggregateInput;
    _avg?: UserCelebrationAvgOrderByAggregateInput;
    _max?: UserCelebrationMaxOrderByAggregateInput;
    _min?: UserCelebrationMinOrderByAggregateInput;
    _sum?: UserCelebrationSumOrderByAggregateInput;
  };

  export type UserCelebrationScalarWhereWithAggregatesInput = {
    AND?:
      | UserCelebrationScalarWhereWithAggregatesInput
      | UserCelebrationScalarWhereWithAggregatesInput[];
    OR?: UserCelebrationScalarWhereWithAggregatesInput[];
    NOT?:
      | UserCelebrationScalarWhereWithAggregatesInput
      | UserCelebrationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"UserCelebration"> | string;
    userId?: StringWithAggregatesFilter<"UserCelebration"> | string;
    celebrationMethodId?:
      | StringWithAggregatesFilter<"UserCelebration">
      | string;
    isDefault?: BoolWithAggregatesFilter<"UserCelebration"> | boolean;
    useCount?: IntWithAggregatesFilter<"UserCelebration"> | number;
  };

  export type DailyRoutineWhereInput = {
    AND?: DailyRoutineWhereInput | DailyRoutineWhereInput[];
    OR?: DailyRoutineWhereInput[];
    NOT?: DailyRoutineWhereInput | DailyRoutineWhereInput[];
    id?: StringFilter<"DailyRoutine"> | string;
    userId?: StringFilter<"DailyRoutine"> | string;
    activities?: JsonFilter<"DailyRoutine">;
    createdAt?: DateTimeFilter<"DailyRoutine"> | Date | string;
    updatedAt?: DateTimeFilter<"DailyRoutine"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type DailyRoutineOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    activities?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type DailyRoutineWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      userId?: string;
      AND?: DailyRoutineWhereInput | DailyRoutineWhereInput[];
      OR?: DailyRoutineWhereInput[];
      NOT?: DailyRoutineWhereInput | DailyRoutineWhereInput[];
      activities?: JsonFilter<"DailyRoutine">;
      createdAt?: DateTimeFilter<"DailyRoutine"> | Date | string;
      updatedAt?: DateTimeFilter<"DailyRoutine"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id" | "userId"
  >;

  export type DailyRoutineOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    activities?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: DailyRoutineCountOrderByAggregateInput;
    _max?: DailyRoutineMaxOrderByAggregateInput;
    _min?: DailyRoutineMinOrderByAggregateInput;
  };

  export type DailyRoutineScalarWhereWithAggregatesInput = {
    AND?:
      | DailyRoutineScalarWhereWithAggregatesInput
      | DailyRoutineScalarWhereWithAggregatesInput[];
    OR?: DailyRoutineScalarWhereWithAggregatesInput[];
    NOT?:
      | DailyRoutineScalarWhereWithAggregatesInput
      | DailyRoutineScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"DailyRoutine"> | string;
    userId?: StringWithAggregatesFilter<"DailyRoutine"> | string;
    activities?: JsonWithAggregatesFilter<"DailyRoutine">;
    createdAt?: DateTimeWithAggregatesFilter<"DailyRoutine"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"DailyRoutine"> | Date | string;
  };

  export type AccountCreateInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    refresh_token_expires_in?: number | null;
    user: UserCreateNestedOneWithoutAccountsInput;
  };

  export type AccountUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    refresh_token_expires_in?: number | null;
  };

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    refresh_token_expires_in?:
      | NullableIntFieldUpdateOperationsInput
      | number
      | null;
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput;
  };

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    refresh_token_expires_in?:
      | NullableIntFieldUpdateOperationsInput
      | number
      | null;
  };

  export type AccountCreateManyInput = {
    id?: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    refresh_token_expires_in?: number | null;
  };

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    refresh_token_expires_in?:
      | NullableIntFieldUpdateOperationsInput
      | number
      | null;
  };

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    refresh_token_expires_in?:
      | NullableIntFieldUpdateOperationsInput
      | number
      | null;
  };

  export type SessionCreateInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
    user: UserCreateNestedOneWithoutSessionsInput;
  };

  export type SessionUncheckedCreateInput = {
    id?: string;
    sessionToken: string;
    userId: string;
    expires: Date | string;
  };

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    id?: string;
    sessionToken: string;
    userId: string;
    expires: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateManyInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    aspirations?: AspirationCreateNestedManyWithoutUserInput;
    habits?: HabitCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    aspirations?: AspirationUncheckedCreateNestedManyWithoutUserInput;
    habits?: HabitUncheckedCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogUncheckedCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineUncheckedCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUpdateManyWithoutUserNestedInput;
    habits?: HabitUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUncheckedUpdateManyWithoutUserNestedInput;
    habits?: HabitUncheckedUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUncheckedUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUncheckedUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitCreateInput = {
    id?: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutHabitsInput;
    aspiration?: AspirationCreateNestedOneWithoutHabitsInput;
    logs?: HabitLogCreateNestedManyWithoutHabitInput;
  };

  export type HabitUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    aspirationId?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logs?: HabitLogUncheckedCreateNestedManyWithoutHabitInput;
  };

  export type HabitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutHabitsNestedInput;
    aspiration?: AspirationUpdateOneWithoutHabitsNestedInput;
    logs?: HabitLogUpdateManyWithoutHabitNestedInput;
  };

  export type HabitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    aspirationId?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    logs?: HabitLogUncheckedUpdateManyWithoutHabitNestedInput;
  };

  export type HabitCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    aspirationId?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HabitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    aspirationId?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitLogCreateInput = {
    id?: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
    habit: HabitCreateNestedOneWithoutLogsInput;
    user: UserCreateNestedOneWithoutHabitLogsInput;
  };

  export type HabitLogUncheckedCreateInput = {
    id?: string;
    habitId: string;
    userId: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
  };

  export type HabitLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    habit?: HabitUpdateOneRequiredWithoutLogsNestedInput;
    user?: UserUpdateOneRequiredWithoutHabitLogsNestedInput;
  };

  export type HabitLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    habitId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitLogCreateManyInput = {
    id?: string;
    habitId: string;
    userId: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
  };

  export type HabitLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    habitId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AspirationCreateInput = {
    id?: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutAspirationsInput;
    habits?: HabitCreateNestedManyWithoutAspirationInput;
  };

  export type AspirationUncheckedCreateInput = {
    id?: string;
    userId: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    habits?: HabitUncheckedCreateNestedManyWithoutAspirationInput;
  };

  export type AspirationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAspirationsNestedInput;
    habits?: HabitUpdateManyWithoutAspirationNestedInput;
  };

  export type AspirationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    habits?: HabitUncheckedUpdateManyWithoutAspirationNestedInput;
  };

  export type AspirationCreateManyInput = {
    id?: string;
    userId: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AspirationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AspirationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CelebrationMethodCreateInput = {
    id?: string;
    category: $Enums.CelebrationCategory;
    content: string;
    emoji?: string | null;
    isBuiltIn?: boolean;
    userFavorites?: UserCelebrationCreateNestedManyWithoutCelebrationMethodInput;
  };

  export type CelebrationMethodUncheckedCreateInput = {
    id?: string;
    category: $Enums.CelebrationCategory;
    content: string;
    emoji?: string | null;
    isBuiltIn?: boolean;
    userFavorites?: UserCelebrationUncheckedCreateNestedManyWithoutCelebrationMethodInput;
  };

  export type CelebrationMethodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    category?:
      | EnumCelebrationCategoryFieldUpdateOperationsInput
      | $Enums.CelebrationCategory;
    content?: StringFieldUpdateOperationsInput | string;
    emoji?: NullableStringFieldUpdateOperationsInput | string | null;
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean;
    userFavorites?: UserCelebrationUpdateManyWithoutCelebrationMethodNestedInput;
  };

  export type CelebrationMethodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    category?:
      | EnumCelebrationCategoryFieldUpdateOperationsInput
      | $Enums.CelebrationCategory;
    content?: StringFieldUpdateOperationsInput | string;
    emoji?: NullableStringFieldUpdateOperationsInput | string | null;
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean;
    userFavorites?: UserCelebrationUncheckedUpdateManyWithoutCelebrationMethodNestedInput;
  };

  export type CelebrationMethodCreateManyInput = {
    id?: string;
    category: $Enums.CelebrationCategory;
    content: string;
    emoji?: string | null;
    isBuiltIn?: boolean;
  };

  export type CelebrationMethodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    category?:
      | EnumCelebrationCategoryFieldUpdateOperationsInput
      | $Enums.CelebrationCategory;
    content?: StringFieldUpdateOperationsInput | string;
    emoji?: NullableStringFieldUpdateOperationsInput | string | null;
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type CelebrationMethodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    category?:
      | EnumCelebrationCategoryFieldUpdateOperationsInput
      | $Enums.CelebrationCategory;
    content?: StringFieldUpdateOperationsInput | string;
    emoji?: NullableStringFieldUpdateOperationsInput | string | null;
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type UserCelebrationCreateInput = {
    id?: string;
    isDefault?: boolean;
    useCount?: number;
    user: UserCreateNestedOneWithoutCelebrationsInput;
    celebrationMethod: CelebrationMethodCreateNestedOneWithoutUserFavoritesInput;
  };

  export type UserCelebrationUncheckedCreateInput = {
    id?: string;
    userId: string;
    celebrationMethodId: string;
    isDefault?: boolean;
    useCount?: number;
  };

  export type UserCelebrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutCelebrationsNestedInput;
    celebrationMethod?: CelebrationMethodUpdateOneRequiredWithoutUserFavoritesNestedInput;
  };

  export type UserCelebrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    celebrationMethodId?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
  };

  export type UserCelebrationCreateManyInput = {
    id?: string;
    userId: string;
    celebrationMethodId: string;
    isDefault?: boolean;
    useCount?: number;
  };

  export type UserCelebrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
  };

  export type UserCelebrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    celebrationMethodId?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
  };

  export type DailyRoutineCreateInput = {
    id?: string;
    activities: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutRoutineInput;
  };

  export type DailyRoutineUncheckedCreateInput = {
    id?: string;
    userId: string;
    activities: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DailyRoutineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    activities?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutRoutineNestedInput;
  };

  export type DailyRoutineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    activities?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DailyRoutineCreateManyInput = {
    id?: string;
    userId: string;
    activities: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DailyRoutineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    activities?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DailyRoutineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    activities?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string;
    providerAccountId: string;
  };

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    refresh_token_expires_in?: SortOrder;
  };

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder;
    refresh_token_expires_in?: SortOrder;
  };

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    refresh_token_expires_in?: SortOrder;
  };

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    refresh_token_expires_in?: SortOrder;
  };

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder;
    refresh_token_expires_in?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string;
    token: string;
  };

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, "path">
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonNullableFilterBase<$PrismaModel>>, "path">
      >;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type AccountListRelationFilter = {
    every?: AccountWhereInput;
    some?: AccountWhereInput;
    none?: AccountWhereInput;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type AspirationListRelationFilter = {
    every?: AspirationWhereInput;
    some?: AspirationWhereInput;
    none?: AspirationWhereInput;
  };

  export type HabitListRelationFilter = {
    every?: HabitWhereInput;
    some?: HabitWhereInput;
    none?: HabitWhereInput;
  };

  export type HabitLogListRelationFilter = {
    every?: HabitLogWhereInput;
    some?: HabitLogWhereInput;
    none?: HabitLogWhereInput;
  };

  export type DailyRoutineNullableScalarRelationFilter = {
    is?: DailyRoutineWhereInput | null;
    isNot?: DailyRoutineWhereInput | null;
  };

  export type UserCelebrationListRelationFilter = {
    every?: UserCelebrationWhereInput;
    some?: UserCelebrationWhereInput;
    none?: UserCelebrationWhereInput;
  };

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AspirationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type HabitOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type HabitLogOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCelebrationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    preferences?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
            "path"
          >
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          "path"
        >
      >;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type EnumHabitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HabitType | EnumHabitTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumHabitTypeFilter<$PrismaModel> | $Enums.HabitType;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type EnumHabitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.HabitStatus | EnumHabitStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.HabitStatus[] | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.HabitStatus[]
      | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumHabitStatusFilter<$PrismaModel> | $Enums.HabitStatus;
  };

  export type AspirationNullableScalarRelationFilter = {
    is?: AspirationWhereInput | null;
    isNot?: AspirationWhereInput | null;
  };

  export type HabitCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    category?: SortOrder;
    anchor?: SortOrder;
    behavior?: SortOrder;
    celebration?: SortOrder;
    aspirationId?: SortOrder;
    currentPhase?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HabitAvgOrderByAggregateInput = {
    currentPhase?: SortOrder;
  };

  export type HabitMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    category?: SortOrder;
    anchor?: SortOrder;
    behavior?: SortOrder;
    celebration?: SortOrder;
    aspirationId?: SortOrder;
    currentPhase?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HabitMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    category?: SortOrder;
    anchor?: SortOrder;
    behavior?: SortOrder;
    celebration?: SortOrder;
    aspirationId?: SortOrder;
    currentPhase?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HabitSumOrderByAggregateInput = {
    currentPhase?: SortOrder;
  };

  export type EnumHabitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HabitType | EnumHabitTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumHabitTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.HabitType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumHabitTypeFilter<$PrismaModel>;
    _max?: NestedEnumHabitTypeFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type EnumHabitStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HabitStatus | EnumHabitStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.HabitStatus[] | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.HabitStatus[]
      | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumHabitStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.HabitStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumHabitStatusFilter<$PrismaModel>;
    _max?: NestedEnumHabitStatusFilter<$PrismaModel>;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type EnumCompletionLevelFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.CompletionLevel
      | EnumCompletionLevelFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCompletionLevelFilter<$PrismaModel>
      | $Enums.CompletionLevel;
  };

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null;
  };

  export type HabitScalarRelationFilter = {
    is?: HabitWhereInput;
    isNot?: HabitWhereInput;
  };

  export type HabitLogHabitIdLoggedAtCompoundUniqueInput = {
    habitId: string;
    loggedAt: Date | string;
  };

  export type HabitLogCountOrderByAggregateInput = {
    id?: SortOrder;
    habitId?: SortOrder;
    userId?: SortOrder;
    loggedAt?: SortOrder;
    completed?: SortOrder;
    completionLevel?: SortOrder;
    actualBehavior?: SortOrder;
    wantedMore?: SortOrder;
    feltEasy?: SortOrder;
    shineScore?: SortOrder;
    moodBefore?: SortOrder;
    moodAfter?: SortOrder;
    note?: SortOrder;
    createdAt?: SortOrder;
  };

  export type HabitLogAvgOrderByAggregateInput = {
    shineScore?: SortOrder;
    moodBefore?: SortOrder;
    moodAfter?: SortOrder;
  };

  export type HabitLogMaxOrderByAggregateInput = {
    id?: SortOrder;
    habitId?: SortOrder;
    userId?: SortOrder;
    loggedAt?: SortOrder;
    completed?: SortOrder;
    completionLevel?: SortOrder;
    actualBehavior?: SortOrder;
    wantedMore?: SortOrder;
    feltEasy?: SortOrder;
    shineScore?: SortOrder;
    moodBefore?: SortOrder;
    moodAfter?: SortOrder;
    note?: SortOrder;
    createdAt?: SortOrder;
  };

  export type HabitLogMinOrderByAggregateInput = {
    id?: SortOrder;
    habitId?: SortOrder;
    userId?: SortOrder;
    loggedAt?: SortOrder;
    completed?: SortOrder;
    completionLevel?: SortOrder;
    actualBehavior?: SortOrder;
    wantedMore?: SortOrder;
    feltEasy?: SortOrder;
    shineScore?: SortOrder;
    moodBefore?: SortOrder;
    moodAfter?: SortOrder;
    note?: SortOrder;
    createdAt?: SortOrder;
  };

  export type HabitLogSumOrderByAggregateInput = {
    shineScore?: SortOrder;
    moodBefore?: SortOrder;
    moodAfter?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumCompletionLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.CompletionLevel
      | EnumCompletionLevelFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCompletionLevelWithAggregatesFilter<$PrismaModel>
      | $Enums.CompletionLevel;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCompletionLevelFilter<$PrismaModel>;
    _max?: NestedEnumCompletionLevelFilter<$PrismaModel>;
  };

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedBoolNullableFilter<$PrismaModel>;
    _max?: NestedBoolNullableFilter<$PrismaModel>;
  };

  export type EnumAspirationStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.AspirationStatus
      | EnumAspirationStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumAspirationStatusFilter<$PrismaModel>
      | $Enums.AspirationStatus;
  };

  export type AspirationCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    description?: SortOrder;
    clarified?: SortOrder;
    category?: SortOrder;
    status?: SortOrder;
    progress?: SortOrder;
    explorationData?: SortOrder;
    achievedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AspirationAvgOrderByAggregateInput = {
    progress?: SortOrder;
  };

  export type AspirationMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    description?: SortOrder;
    clarified?: SortOrder;
    category?: SortOrder;
    status?: SortOrder;
    progress?: SortOrder;
    achievedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AspirationMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    description?: SortOrder;
    clarified?: SortOrder;
    category?: SortOrder;
    status?: SortOrder;
    progress?: SortOrder;
    achievedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AspirationSumOrderByAggregateInput = {
    progress?: SortOrder;
  };

  export type EnumAspirationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.AspirationStatus
      | EnumAspirationStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumAspirationStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.AspirationStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAspirationStatusFilter<$PrismaModel>;
    _max?: NestedEnumAspirationStatusFilter<$PrismaModel>;
  };

  export type EnumCelebrationCategoryFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.CelebrationCategory
      | EnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCelebrationCategoryFilter<$PrismaModel>
      | $Enums.CelebrationCategory;
  };

  export type CelebrationMethodCountOrderByAggregateInput = {
    id?: SortOrder;
    category?: SortOrder;
    content?: SortOrder;
    emoji?: SortOrder;
    isBuiltIn?: SortOrder;
  };

  export type CelebrationMethodMaxOrderByAggregateInput = {
    id?: SortOrder;
    category?: SortOrder;
    content?: SortOrder;
    emoji?: SortOrder;
    isBuiltIn?: SortOrder;
  };

  export type CelebrationMethodMinOrderByAggregateInput = {
    id?: SortOrder;
    category?: SortOrder;
    content?: SortOrder;
    emoji?: SortOrder;
    isBuiltIn?: SortOrder;
  };

  export type EnumCelebrationCategoryWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.CelebrationCategory
      | EnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCelebrationCategoryWithAggregatesFilter<$PrismaModel>
      | $Enums.CelebrationCategory;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCelebrationCategoryFilter<$PrismaModel>;
    _max?: NestedEnumCelebrationCategoryFilter<$PrismaModel>;
  };

  export type CelebrationMethodScalarRelationFilter = {
    is?: CelebrationMethodWhereInput;
    isNot?: CelebrationMethodWhereInput;
  };

  export type UserCelebrationUserIdCelebrationMethodIdCompoundUniqueInput = {
    userId: string;
    celebrationMethodId: string;
  };

  export type UserCelebrationCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    celebrationMethodId?: SortOrder;
    isDefault?: SortOrder;
    useCount?: SortOrder;
  };

  export type UserCelebrationAvgOrderByAggregateInput = {
    useCount?: SortOrder;
  };

  export type UserCelebrationMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    celebrationMethodId?: SortOrder;
    isDefault?: SortOrder;
    useCount?: SortOrder;
  };

  export type UserCelebrationMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    celebrationMethodId?: SortOrder;
    isDefault?: SortOrder;
    useCount?: SortOrder;
  };

  export type UserCelebrationSumOrderByAggregateInput = {
    useCount?: SortOrder;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, "path">>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type DailyRoutineCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    activities?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DailyRoutineMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DailyRoutineMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            "path"
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, "path">
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    upsert?: UserUpsertWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAccountsInput,
        UserUpdateWithoutAccountsInput
      >,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSessionsInput,
        UserUpdateWithoutSessionsInput
      >,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type AccountCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type AspirationCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AspirationCreateWithoutUserInput,
          AspirationUncheckedCreateWithoutUserInput
        >
      | AspirationCreateWithoutUserInput[]
      | AspirationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AspirationCreateOrConnectWithoutUserInput
      | AspirationCreateOrConnectWithoutUserInput[];
    createMany?: AspirationCreateManyUserInputEnvelope;
    connect?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
  };

  export type HabitCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<HabitCreateWithoutUserInput, HabitUncheckedCreateWithoutUserInput>
      | HabitCreateWithoutUserInput[]
      | HabitUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutUserInput
      | HabitCreateOrConnectWithoutUserInput[];
    createMany?: HabitCreateManyUserInputEnvelope;
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
  };

  export type HabitLogCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutUserInput,
          HabitLogUncheckedCreateWithoutUserInput
        >
      | HabitLogCreateWithoutUserInput[]
      | HabitLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutUserInput
      | HabitLogCreateOrConnectWithoutUserInput[];
    createMany?: HabitLogCreateManyUserInputEnvelope;
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
  };

  export type DailyRoutineCreateNestedOneWithoutUserInput = {
    create?: XOR<
      DailyRoutineCreateWithoutUserInput,
      DailyRoutineUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: DailyRoutineCreateOrConnectWithoutUserInput;
    connect?: DailyRoutineWhereUniqueInput;
  };

  export type UserCelebrationCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserCelebrationCreateWithoutUserInput,
          UserCelebrationUncheckedCreateWithoutUserInput
        >
      | UserCelebrationCreateWithoutUserInput[]
      | UserCelebrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserCelebrationCreateOrConnectWithoutUserInput
      | UserCelebrationCreateOrConnectWithoutUserInput[];
    createMany?: UserCelebrationCreateManyUserInputEnvelope;
    connect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
  };

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type AspirationUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AspirationCreateWithoutUserInput,
          AspirationUncheckedCreateWithoutUserInput
        >
      | AspirationCreateWithoutUserInput[]
      | AspirationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AspirationCreateOrConnectWithoutUserInput
      | AspirationCreateOrConnectWithoutUserInput[];
    createMany?: AspirationCreateManyUserInputEnvelope;
    connect?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
  };

  export type HabitUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<HabitCreateWithoutUserInput, HabitUncheckedCreateWithoutUserInput>
      | HabitCreateWithoutUserInput[]
      | HabitUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutUserInput
      | HabitCreateOrConnectWithoutUserInput[];
    createMany?: HabitCreateManyUserInputEnvelope;
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
  };

  export type HabitLogUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutUserInput,
          HabitLogUncheckedCreateWithoutUserInput
        >
      | HabitLogCreateWithoutUserInput[]
      | HabitLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutUserInput
      | HabitLogCreateOrConnectWithoutUserInput[];
    createMany?: HabitLogCreateManyUserInputEnvelope;
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
  };

  export type DailyRoutineUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<
      DailyRoutineCreateWithoutUserInput,
      DailyRoutineUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: DailyRoutineCreateOrConnectWithoutUserInput;
    connect?: DailyRoutineWhereUniqueInput;
  };

  export type UserCelebrationUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserCelebrationCreateWithoutUserInput,
          UserCelebrationUncheckedCreateWithoutUserInput
        >
      | UserCelebrationCreateWithoutUserInput[]
      | UserCelebrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserCelebrationCreateOrConnectWithoutUserInput
      | UserCelebrationCreateOrConnectWithoutUserInput[];
    createMany?: UserCelebrationCreateManyUserInputEnvelope;
    connect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type AspirationUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AspirationCreateWithoutUserInput,
          AspirationUncheckedCreateWithoutUserInput
        >
      | AspirationCreateWithoutUserInput[]
      | AspirationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AspirationCreateOrConnectWithoutUserInput
      | AspirationCreateOrConnectWithoutUserInput[];
    upsert?:
      | AspirationUpsertWithWhereUniqueWithoutUserInput
      | AspirationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AspirationCreateManyUserInputEnvelope;
    set?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    disconnect?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    delete?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    connect?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    update?:
      | AspirationUpdateWithWhereUniqueWithoutUserInput
      | AspirationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AspirationUpdateManyWithWhereWithoutUserInput
      | AspirationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AspirationScalarWhereInput | AspirationScalarWhereInput[];
  };

  export type HabitUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<HabitCreateWithoutUserInput, HabitUncheckedCreateWithoutUserInput>
      | HabitCreateWithoutUserInput[]
      | HabitUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutUserInput
      | HabitCreateOrConnectWithoutUserInput[];
    upsert?:
      | HabitUpsertWithWhereUniqueWithoutUserInput
      | HabitUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: HabitCreateManyUserInputEnvelope;
    set?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    disconnect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    delete?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    update?:
      | HabitUpdateWithWhereUniqueWithoutUserInput
      | HabitUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | HabitUpdateManyWithWhereWithoutUserInput
      | HabitUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: HabitScalarWhereInput | HabitScalarWhereInput[];
  };

  export type HabitLogUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutUserInput,
          HabitLogUncheckedCreateWithoutUserInput
        >
      | HabitLogCreateWithoutUserInput[]
      | HabitLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutUserInput
      | HabitLogCreateOrConnectWithoutUserInput[];
    upsert?:
      | HabitLogUpsertWithWhereUniqueWithoutUserInput
      | HabitLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: HabitLogCreateManyUserInputEnvelope;
    set?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    disconnect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    delete?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    update?:
      | HabitLogUpdateWithWhereUniqueWithoutUserInput
      | HabitLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | HabitLogUpdateManyWithWhereWithoutUserInput
      | HabitLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: HabitLogScalarWhereInput | HabitLogScalarWhereInput[];
  };

  export type DailyRoutineUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      DailyRoutineCreateWithoutUserInput,
      DailyRoutineUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: DailyRoutineCreateOrConnectWithoutUserInput;
    upsert?: DailyRoutineUpsertWithoutUserInput;
    disconnect?: DailyRoutineWhereInput | boolean;
    delete?: DailyRoutineWhereInput | boolean;
    connect?: DailyRoutineWhereUniqueInput;
    update?: XOR<
      XOR<
        DailyRoutineUpdateToOneWithWhereWithoutUserInput,
        DailyRoutineUpdateWithoutUserInput
      >,
      DailyRoutineUncheckedUpdateWithoutUserInput
    >;
  };

  export type UserCelebrationUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserCelebrationCreateWithoutUserInput,
          UserCelebrationUncheckedCreateWithoutUserInput
        >
      | UserCelebrationCreateWithoutUserInput[]
      | UserCelebrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserCelebrationCreateOrConnectWithoutUserInput
      | UserCelebrationCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserCelebrationUpsertWithWhereUniqueWithoutUserInput
      | UserCelebrationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserCelebrationCreateManyUserInputEnvelope;
    set?: UserCelebrationWhereUniqueInput | UserCelebrationWhereUniqueInput[];
    disconnect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    delete?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    connect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    update?:
      | UserCelebrationUpdateWithWhereUniqueWithoutUserInput
      | UserCelebrationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserCelebrationUpdateManyWithWhereWithoutUserInput
      | UserCelebrationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | UserCelebrationScalarWhereInput
      | UserCelebrationScalarWhereInput[];
  };

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type AspirationUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AspirationCreateWithoutUserInput,
          AspirationUncheckedCreateWithoutUserInput
        >
      | AspirationCreateWithoutUserInput[]
      | AspirationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AspirationCreateOrConnectWithoutUserInput
      | AspirationCreateOrConnectWithoutUserInput[];
    upsert?:
      | AspirationUpsertWithWhereUniqueWithoutUserInput
      | AspirationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AspirationCreateManyUserInputEnvelope;
    set?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    disconnect?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    delete?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    connect?: AspirationWhereUniqueInput | AspirationWhereUniqueInput[];
    update?:
      | AspirationUpdateWithWhereUniqueWithoutUserInput
      | AspirationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AspirationUpdateManyWithWhereWithoutUserInput
      | AspirationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AspirationScalarWhereInput | AspirationScalarWhereInput[];
  };

  export type HabitUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<HabitCreateWithoutUserInput, HabitUncheckedCreateWithoutUserInput>
      | HabitCreateWithoutUserInput[]
      | HabitUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutUserInput
      | HabitCreateOrConnectWithoutUserInput[];
    upsert?:
      | HabitUpsertWithWhereUniqueWithoutUserInput
      | HabitUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: HabitCreateManyUserInputEnvelope;
    set?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    disconnect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    delete?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    update?:
      | HabitUpdateWithWhereUniqueWithoutUserInput
      | HabitUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | HabitUpdateManyWithWhereWithoutUserInput
      | HabitUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: HabitScalarWhereInput | HabitScalarWhereInput[];
  };

  export type HabitLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutUserInput,
          HabitLogUncheckedCreateWithoutUserInput
        >
      | HabitLogCreateWithoutUserInput[]
      | HabitLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutUserInput
      | HabitLogCreateOrConnectWithoutUserInput[];
    upsert?:
      | HabitLogUpsertWithWhereUniqueWithoutUserInput
      | HabitLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: HabitLogCreateManyUserInputEnvelope;
    set?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    disconnect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    delete?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    update?:
      | HabitLogUpdateWithWhereUniqueWithoutUserInput
      | HabitLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | HabitLogUpdateManyWithWhereWithoutUserInput
      | HabitLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: HabitLogScalarWhereInput | HabitLogScalarWhereInput[];
  };

  export type DailyRoutineUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      DailyRoutineCreateWithoutUserInput,
      DailyRoutineUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: DailyRoutineCreateOrConnectWithoutUserInput;
    upsert?: DailyRoutineUpsertWithoutUserInput;
    disconnect?: DailyRoutineWhereInput | boolean;
    delete?: DailyRoutineWhereInput | boolean;
    connect?: DailyRoutineWhereUniqueInput;
    update?: XOR<
      XOR<
        DailyRoutineUpdateToOneWithWhereWithoutUserInput,
        DailyRoutineUpdateWithoutUserInput
      >,
      DailyRoutineUncheckedUpdateWithoutUserInput
    >;
  };

  export type UserCelebrationUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserCelebrationCreateWithoutUserInput,
          UserCelebrationUncheckedCreateWithoutUserInput
        >
      | UserCelebrationCreateWithoutUserInput[]
      | UserCelebrationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserCelebrationCreateOrConnectWithoutUserInput
      | UserCelebrationCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserCelebrationUpsertWithWhereUniqueWithoutUserInput
      | UserCelebrationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserCelebrationCreateManyUserInputEnvelope;
    set?: UserCelebrationWhereUniqueInput | UserCelebrationWhereUniqueInput[];
    disconnect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    delete?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    connect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    update?:
      | UserCelebrationUpdateWithWhereUniqueWithoutUserInput
      | UserCelebrationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserCelebrationUpdateManyWithWhereWithoutUserInput
      | UserCelebrationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | UserCelebrationScalarWhereInput
      | UserCelebrationScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutHabitsInput = {
    create?: XOR<
      UserCreateWithoutHabitsInput,
      UserUncheckedCreateWithoutHabitsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutHabitsInput;
    connect?: UserWhereUniqueInput;
  };

  export type AspirationCreateNestedOneWithoutHabitsInput = {
    create?: XOR<
      AspirationCreateWithoutHabitsInput,
      AspirationUncheckedCreateWithoutHabitsInput
    >;
    connectOrCreate?: AspirationCreateOrConnectWithoutHabitsInput;
    connect?: AspirationWhereUniqueInput;
  };

  export type HabitLogCreateNestedManyWithoutHabitInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutHabitInput,
          HabitLogUncheckedCreateWithoutHabitInput
        >
      | HabitLogCreateWithoutHabitInput[]
      | HabitLogUncheckedCreateWithoutHabitInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutHabitInput
      | HabitLogCreateOrConnectWithoutHabitInput[];
    createMany?: HabitLogCreateManyHabitInputEnvelope;
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
  };

  export type HabitLogUncheckedCreateNestedManyWithoutHabitInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutHabitInput,
          HabitLogUncheckedCreateWithoutHabitInput
        >
      | HabitLogCreateWithoutHabitInput[]
      | HabitLogUncheckedCreateWithoutHabitInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutHabitInput
      | HabitLogCreateOrConnectWithoutHabitInput[];
    createMany?: HabitLogCreateManyHabitInputEnvelope;
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
  };

  export type EnumHabitTypeFieldUpdateOperationsInput = {
    set?: $Enums.HabitType;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumHabitStatusFieldUpdateOperationsInput = {
    set?: $Enums.HabitStatus;
  };

  export type UserUpdateOneRequiredWithoutHabitsNestedInput = {
    create?: XOR<
      UserCreateWithoutHabitsInput,
      UserUncheckedCreateWithoutHabitsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutHabitsInput;
    upsert?: UserUpsertWithoutHabitsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutHabitsInput,
        UserUpdateWithoutHabitsInput
      >,
      UserUncheckedUpdateWithoutHabitsInput
    >;
  };

  export type AspirationUpdateOneWithoutHabitsNestedInput = {
    create?: XOR<
      AspirationCreateWithoutHabitsInput,
      AspirationUncheckedCreateWithoutHabitsInput
    >;
    connectOrCreate?: AspirationCreateOrConnectWithoutHabitsInput;
    upsert?: AspirationUpsertWithoutHabitsInput;
    disconnect?: AspirationWhereInput | boolean;
    delete?: AspirationWhereInput | boolean;
    connect?: AspirationWhereUniqueInput;
    update?: XOR<
      XOR<
        AspirationUpdateToOneWithWhereWithoutHabitsInput,
        AspirationUpdateWithoutHabitsInput
      >,
      AspirationUncheckedUpdateWithoutHabitsInput
    >;
  };

  export type HabitLogUpdateManyWithoutHabitNestedInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutHabitInput,
          HabitLogUncheckedCreateWithoutHabitInput
        >
      | HabitLogCreateWithoutHabitInput[]
      | HabitLogUncheckedCreateWithoutHabitInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutHabitInput
      | HabitLogCreateOrConnectWithoutHabitInput[];
    upsert?:
      | HabitLogUpsertWithWhereUniqueWithoutHabitInput
      | HabitLogUpsertWithWhereUniqueWithoutHabitInput[];
    createMany?: HabitLogCreateManyHabitInputEnvelope;
    set?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    disconnect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    delete?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    update?:
      | HabitLogUpdateWithWhereUniqueWithoutHabitInput
      | HabitLogUpdateWithWhereUniqueWithoutHabitInput[];
    updateMany?:
      | HabitLogUpdateManyWithWhereWithoutHabitInput
      | HabitLogUpdateManyWithWhereWithoutHabitInput[];
    deleteMany?: HabitLogScalarWhereInput | HabitLogScalarWhereInput[];
  };

  export type HabitLogUncheckedUpdateManyWithoutHabitNestedInput = {
    create?:
      | XOR<
          HabitLogCreateWithoutHabitInput,
          HabitLogUncheckedCreateWithoutHabitInput
        >
      | HabitLogCreateWithoutHabitInput[]
      | HabitLogUncheckedCreateWithoutHabitInput[];
    connectOrCreate?:
      | HabitLogCreateOrConnectWithoutHabitInput
      | HabitLogCreateOrConnectWithoutHabitInput[];
    upsert?:
      | HabitLogUpsertWithWhereUniqueWithoutHabitInput
      | HabitLogUpsertWithWhereUniqueWithoutHabitInput[];
    createMany?: HabitLogCreateManyHabitInputEnvelope;
    set?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    disconnect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    delete?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    connect?: HabitLogWhereUniqueInput | HabitLogWhereUniqueInput[];
    update?:
      | HabitLogUpdateWithWhereUniqueWithoutHabitInput
      | HabitLogUpdateWithWhereUniqueWithoutHabitInput[];
    updateMany?:
      | HabitLogUpdateManyWithWhereWithoutHabitInput
      | HabitLogUpdateManyWithWhereWithoutHabitInput[];
    deleteMany?: HabitLogScalarWhereInput | HabitLogScalarWhereInput[];
  };

  export type HabitCreateNestedOneWithoutLogsInput = {
    create?: XOR<
      HabitCreateWithoutLogsInput,
      HabitUncheckedCreateWithoutLogsInput
    >;
    connectOrCreate?: HabitCreateOrConnectWithoutLogsInput;
    connect?: HabitWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutHabitLogsInput = {
    create?: XOR<
      UserCreateWithoutHabitLogsInput,
      UserUncheckedCreateWithoutHabitLogsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutHabitLogsInput;
    connect?: UserWhereUniqueInput;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type EnumCompletionLevelFieldUpdateOperationsInput = {
    set?: $Enums.CompletionLevel;
  };

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
  };

  export type HabitUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<
      HabitCreateWithoutLogsInput,
      HabitUncheckedCreateWithoutLogsInput
    >;
    connectOrCreate?: HabitCreateOrConnectWithoutLogsInput;
    upsert?: HabitUpsertWithoutLogsInput;
    connect?: HabitWhereUniqueInput;
    update?: XOR<
      XOR<
        HabitUpdateToOneWithWhereWithoutLogsInput,
        HabitUpdateWithoutLogsInput
      >,
      HabitUncheckedUpdateWithoutLogsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutHabitLogsNestedInput = {
    create?: XOR<
      UserCreateWithoutHabitLogsInput,
      UserUncheckedCreateWithoutHabitLogsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutHabitLogsInput;
    upsert?: UserUpsertWithoutHabitLogsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutHabitLogsInput,
        UserUpdateWithoutHabitLogsInput
      >,
      UserUncheckedUpdateWithoutHabitLogsInput
    >;
  };

  export type UserCreateNestedOneWithoutAspirationsInput = {
    create?: XOR<
      UserCreateWithoutAspirationsInput,
      UserUncheckedCreateWithoutAspirationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAspirationsInput;
    connect?: UserWhereUniqueInput;
  };

  export type HabitCreateNestedManyWithoutAspirationInput = {
    create?:
      | XOR<
          HabitCreateWithoutAspirationInput,
          HabitUncheckedCreateWithoutAspirationInput
        >
      | HabitCreateWithoutAspirationInput[]
      | HabitUncheckedCreateWithoutAspirationInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutAspirationInput
      | HabitCreateOrConnectWithoutAspirationInput[];
    createMany?: HabitCreateManyAspirationInputEnvelope;
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
  };

  export type HabitUncheckedCreateNestedManyWithoutAspirationInput = {
    create?:
      | XOR<
          HabitCreateWithoutAspirationInput,
          HabitUncheckedCreateWithoutAspirationInput
        >
      | HabitCreateWithoutAspirationInput[]
      | HabitUncheckedCreateWithoutAspirationInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutAspirationInput
      | HabitCreateOrConnectWithoutAspirationInput[];
    createMany?: HabitCreateManyAspirationInputEnvelope;
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
  };

  export type EnumAspirationStatusFieldUpdateOperationsInput = {
    set?: $Enums.AspirationStatus;
  };

  export type UserUpdateOneRequiredWithoutAspirationsNestedInput = {
    create?: XOR<
      UserCreateWithoutAspirationsInput,
      UserUncheckedCreateWithoutAspirationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAspirationsInput;
    upsert?: UserUpsertWithoutAspirationsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAspirationsInput,
        UserUpdateWithoutAspirationsInput
      >,
      UserUncheckedUpdateWithoutAspirationsInput
    >;
  };

  export type HabitUpdateManyWithoutAspirationNestedInput = {
    create?:
      | XOR<
          HabitCreateWithoutAspirationInput,
          HabitUncheckedCreateWithoutAspirationInput
        >
      | HabitCreateWithoutAspirationInput[]
      | HabitUncheckedCreateWithoutAspirationInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutAspirationInput
      | HabitCreateOrConnectWithoutAspirationInput[];
    upsert?:
      | HabitUpsertWithWhereUniqueWithoutAspirationInput
      | HabitUpsertWithWhereUniqueWithoutAspirationInput[];
    createMany?: HabitCreateManyAspirationInputEnvelope;
    set?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    disconnect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    delete?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    update?:
      | HabitUpdateWithWhereUniqueWithoutAspirationInput
      | HabitUpdateWithWhereUniqueWithoutAspirationInput[];
    updateMany?:
      | HabitUpdateManyWithWhereWithoutAspirationInput
      | HabitUpdateManyWithWhereWithoutAspirationInput[];
    deleteMany?: HabitScalarWhereInput | HabitScalarWhereInput[];
  };

  export type HabitUncheckedUpdateManyWithoutAspirationNestedInput = {
    create?:
      | XOR<
          HabitCreateWithoutAspirationInput,
          HabitUncheckedCreateWithoutAspirationInput
        >
      | HabitCreateWithoutAspirationInput[]
      | HabitUncheckedCreateWithoutAspirationInput[];
    connectOrCreate?:
      | HabitCreateOrConnectWithoutAspirationInput
      | HabitCreateOrConnectWithoutAspirationInput[];
    upsert?:
      | HabitUpsertWithWhereUniqueWithoutAspirationInput
      | HabitUpsertWithWhereUniqueWithoutAspirationInput[];
    createMany?: HabitCreateManyAspirationInputEnvelope;
    set?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    disconnect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    delete?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    connect?: HabitWhereUniqueInput | HabitWhereUniqueInput[];
    update?:
      | HabitUpdateWithWhereUniqueWithoutAspirationInput
      | HabitUpdateWithWhereUniqueWithoutAspirationInput[];
    updateMany?:
      | HabitUpdateManyWithWhereWithoutAspirationInput
      | HabitUpdateManyWithWhereWithoutAspirationInput[];
    deleteMany?: HabitScalarWhereInput | HabitScalarWhereInput[];
  };

  export type UserCelebrationCreateNestedManyWithoutCelebrationMethodInput = {
    create?:
      | XOR<
          UserCelebrationCreateWithoutCelebrationMethodInput,
          UserCelebrationUncheckedCreateWithoutCelebrationMethodInput
        >
      | UserCelebrationCreateWithoutCelebrationMethodInput[]
      | UserCelebrationUncheckedCreateWithoutCelebrationMethodInput[];
    connectOrCreate?:
      | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput
      | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput[];
    createMany?: UserCelebrationCreateManyCelebrationMethodInputEnvelope;
    connect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
  };

  export type UserCelebrationUncheckedCreateNestedManyWithoutCelebrationMethodInput =
    {
      create?:
        | XOR<
            UserCelebrationCreateWithoutCelebrationMethodInput,
            UserCelebrationUncheckedCreateWithoutCelebrationMethodInput
          >
        | UserCelebrationCreateWithoutCelebrationMethodInput[]
        | UserCelebrationUncheckedCreateWithoutCelebrationMethodInput[];
      connectOrCreate?:
        | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput
        | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput[];
      createMany?: UserCelebrationCreateManyCelebrationMethodInputEnvelope;
      connect?:
        | UserCelebrationWhereUniqueInput
        | UserCelebrationWhereUniqueInput[];
    };

  export type EnumCelebrationCategoryFieldUpdateOperationsInput = {
    set?: $Enums.CelebrationCategory;
  };

  export type UserCelebrationUpdateManyWithoutCelebrationMethodNestedInput = {
    create?:
      | XOR<
          UserCelebrationCreateWithoutCelebrationMethodInput,
          UserCelebrationUncheckedCreateWithoutCelebrationMethodInput
        >
      | UserCelebrationCreateWithoutCelebrationMethodInput[]
      | UserCelebrationUncheckedCreateWithoutCelebrationMethodInput[];
    connectOrCreate?:
      | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput
      | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput[];
    upsert?:
      | UserCelebrationUpsertWithWhereUniqueWithoutCelebrationMethodInput
      | UserCelebrationUpsertWithWhereUniqueWithoutCelebrationMethodInput[];
    createMany?: UserCelebrationCreateManyCelebrationMethodInputEnvelope;
    set?: UserCelebrationWhereUniqueInput | UserCelebrationWhereUniqueInput[];
    disconnect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    delete?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    connect?:
      | UserCelebrationWhereUniqueInput
      | UserCelebrationWhereUniqueInput[];
    update?:
      | UserCelebrationUpdateWithWhereUniqueWithoutCelebrationMethodInput
      | UserCelebrationUpdateWithWhereUniqueWithoutCelebrationMethodInput[];
    updateMany?:
      | UserCelebrationUpdateManyWithWhereWithoutCelebrationMethodInput
      | UserCelebrationUpdateManyWithWhereWithoutCelebrationMethodInput[];
    deleteMany?:
      | UserCelebrationScalarWhereInput
      | UserCelebrationScalarWhereInput[];
  };

  export type UserCelebrationUncheckedUpdateManyWithoutCelebrationMethodNestedInput =
    {
      create?:
        | XOR<
            UserCelebrationCreateWithoutCelebrationMethodInput,
            UserCelebrationUncheckedCreateWithoutCelebrationMethodInput
          >
        | UserCelebrationCreateWithoutCelebrationMethodInput[]
        | UserCelebrationUncheckedCreateWithoutCelebrationMethodInput[];
      connectOrCreate?:
        | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput
        | UserCelebrationCreateOrConnectWithoutCelebrationMethodInput[];
      upsert?:
        | UserCelebrationUpsertWithWhereUniqueWithoutCelebrationMethodInput
        | UserCelebrationUpsertWithWhereUniqueWithoutCelebrationMethodInput[];
      createMany?: UserCelebrationCreateManyCelebrationMethodInputEnvelope;
      set?: UserCelebrationWhereUniqueInput | UserCelebrationWhereUniqueInput[];
      disconnect?:
        | UserCelebrationWhereUniqueInput
        | UserCelebrationWhereUniqueInput[];
      delete?:
        | UserCelebrationWhereUniqueInput
        | UserCelebrationWhereUniqueInput[];
      connect?:
        | UserCelebrationWhereUniqueInput
        | UserCelebrationWhereUniqueInput[];
      update?:
        | UserCelebrationUpdateWithWhereUniqueWithoutCelebrationMethodInput
        | UserCelebrationUpdateWithWhereUniqueWithoutCelebrationMethodInput[];
      updateMany?:
        | UserCelebrationUpdateManyWithWhereWithoutCelebrationMethodInput
        | UserCelebrationUpdateManyWithWhereWithoutCelebrationMethodInput[];
      deleteMany?:
        | UserCelebrationScalarWhereInput
        | UserCelebrationScalarWhereInput[];
    };

  export type UserCreateNestedOneWithoutCelebrationsInput = {
    create?: XOR<
      UserCreateWithoutCelebrationsInput,
      UserUncheckedCreateWithoutCelebrationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutCelebrationsInput;
    connect?: UserWhereUniqueInput;
  };

  export type CelebrationMethodCreateNestedOneWithoutUserFavoritesInput = {
    create?: XOR<
      CelebrationMethodCreateWithoutUserFavoritesInput,
      CelebrationMethodUncheckedCreateWithoutUserFavoritesInput
    >;
    connectOrCreate?: CelebrationMethodCreateOrConnectWithoutUserFavoritesInput;
    connect?: CelebrationMethodWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutCelebrationsNestedInput = {
    create?: XOR<
      UserCreateWithoutCelebrationsInput,
      UserUncheckedCreateWithoutCelebrationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutCelebrationsInput;
    upsert?: UserUpsertWithoutCelebrationsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutCelebrationsInput,
        UserUpdateWithoutCelebrationsInput
      >,
      UserUncheckedUpdateWithoutCelebrationsInput
    >;
  };

  export type CelebrationMethodUpdateOneRequiredWithoutUserFavoritesNestedInput =
    {
      create?: XOR<
        CelebrationMethodCreateWithoutUserFavoritesInput,
        CelebrationMethodUncheckedCreateWithoutUserFavoritesInput
      >;
      connectOrCreate?: CelebrationMethodCreateOrConnectWithoutUserFavoritesInput;
      upsert?: CelebrationMethodUpsertWithoutUserFavoritesInput;
      connect?: CelebrationMethodWhereUniqueInput;
      update?: XOR<
        XOR<
          CelebrationMethodUpdateToOneWithWhereWithoutUserFavoritesInput,
          CelebrationMethodUpdateWithoutUserFavoritesInput
        >,
        CelebrationMethodUncheckedUpdateWithoutUserFavoritesInput
      >;
    };

  export type UserCreateNestedOneWithoutRoutineInput = {
    create?: XOR<
      UserCreateWithoutRoutineInput,
      UserUncheckedCreateWithoutRoutineInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRoutineInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutRoutineNestedInput = {
    create?: XOR<
      UserCreateWithoutRoutineInput,
      UserUncheckedCreateWithoutRoutineInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRoutineInput;
    upsert?: UserUpsertWithoutRoutineInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutRoutineInput,
        UserUpdateWithoutRoutineInput
      >,
      UserUncheckedUpdateWithoutRoutineInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>,
            "path"
          >
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, "path">
      >;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedEnumHabitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HabitType | EnumHabitTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumHabitTypeFilter<$PrismaModel> | $Enums.HabitType;
  };

  export type NestedEnumHabitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.HabitStatus | EnumHabitStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.HabitStatus[] | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.HabitStatus[]
      | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumHabitStatusFilter<$PrismaModel> | $Enums.HabitStatus;
  };

  export type NestedEnumHabitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HabitType | EnumHabitTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HabitType[] | ListEnumHabitTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumHabitTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.HabitType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumHabitTypeFilter<$PrismaModel>;
    _max?: NestedEnumHabitTypeFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumHabitStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.HabitStatus | EnumHabitStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.HabitStatus[]
        | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.HabitStatus[]
        | ListEnumHabitStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumHabitStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.HabitStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumHabitStatusFilter<$PrismaModel>;
      _max?: NestedEnumHabitStatusFilter<$PrismaModel>;
    };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedEnumCompletionLevelFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.CompletionLevel
      | EnumCompletionLevelFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCompletionLevelFilter<$PrismaModel>
      | $Enums.CompletionLevel;
  };

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumCompletionLevelWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.CompletionLevel
      | EnumCompletionLevelFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CompletionLevel[]
      | ListEnumCompletionLevelFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCompletionLevelWithAggregatesFilter<$PrismaModel>
      | $Enums.CompletionLevel;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCompletionLevelFilter<$PrismaModel>;
    _max?: NestedEnumCompletionLevelFilter<$PrismaModel>;
  };

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedBoolNullableFilter<$PrismaModel>;
    _max?: NestedBoolNullableFilter<$PrismaModel>;
  };

  export type NestedEnumAspirationStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.AspirationStatus
      | EnumAspirationStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumAspirationStatusFilter<$PrismaModel>
      | $Enums.AspirationStatus;
  };

  export type NestedEnumAspirationStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.AspirationStatus
      | EnumAspirationStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.AspirationStatus[]
      | ListEnumAspirationStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumAspirationStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.AspirationStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAspirationStatusFilter<$PrismaModel>;
    _max?: NestedEnumAspirationStatusFilter<$PrismaModel>;
  };

  export type NestedEnumCelebrationCategoryFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.CelebrationCategory
      | EnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCelebrationCategoryFilter<$PrismaModel>
      | $Enums.CelebrationCategory;
  };

  export type NestedEnumCelebrationCategoryWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.CelebrationCategory
      | EnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.CelebrationCategory[]
      | ListEnumCelebrationCategoryFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCelebrationCategoryWithAggregatesFilter<$PrismaModel>
      | $Enums.CelebrationCategory;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCelebrationCategoryFilter<$PrismaModel>;
    _max?: NestedEnumCelebrationCategoryFilter<$PrismaModel>;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, "path">>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type UserCreateWithoutAccountsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    aspirations?: AspirationCreateNestedManyWithoutUserInput;
    habits?: HabitCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    aspirations?: AspirationUncheckedCreateNestedManyWithoutUserInput;
    habits?: HabitUncheckedCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogUncheckedCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineUncheckedCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
  };

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUpdateManyWithoutUserNestedInput;
    habits?: HabitUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUncheckedUpdateManyWithoutUserNestedInput;
    habits?: HabitUncheckedUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUncheckedUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUncheckedUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutSessionsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    aspirations?: AspirationCreateNestedManyWithoutUserInput;
    habits?: HabitCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    aspirations?: AspirationUncheckedCreateNestedManyWithoutUserInput;
    habits?: HabitUncheckedCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogUncheckedCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineUncheckedCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
  };

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUpdateManyWithoutUserNestedInput;
    habits?: HabitUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUncheckedUpdateManyWithoutUserNestedInput;
    habits?: HabitUncheckedUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUncheckedUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUncheckedUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type AccountCreateWithoutUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    refresh_token_expires_in?: number | null;
  };

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    refresh_token_expires_in?: number | null;
  };

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SessionCreateWithoutUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AspirationCreateWithoutUserInput = {
    id?: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    habits?: HabitCreateNestedManyWithoutAspirationInput;
  };

  export type AspirationUncheckedCreateWithoutUserInput = {
    id?: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    habits?: HabitUncheckedCreateNestedManyWithoutAspirationInput;
  };

  export type AspirationCreateOrConnectWithoutUserInput = {
    where: AspirationWhereUniqueInput;
    create: XOR<
      AspirationCreateWithoutUserInput,
      AspirationUncheckedCreateWithoutUserInput
    >;
  };

  export type AspirationCreateManyUserInputEnvelope = {
    data: AspirationCreateManyUserInput | AspirationCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type HabitCreateWithoutUserInput = {
    id?: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    aspiration?: AspirationCreateNestedOneWithoutHabitsInput;
    logs?: HabitLogCreateNestedManyWithoutHabitInput;
  };

  export type HabitUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    aspirationId?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logs?: HabitLogUncheckedCreateNestedManyWithoutHabitInput;
  };

  export type HabitCreateOrConnectWithoutUserInput = {
    where: HabitWhereUniqueInput;
    create: XOR<
      HabitCreateWithoutUserInput,
      HabitUncheckedCreateWithoutUserInput
    >;
  };

  export type HabitCreateManyUserInputEnvelope = {
    data: HabitCreateManyUserInput | HabitCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type HabitLogCreateWithoutUserInput = {
    id?: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
    habit: HabitCreateNestedOneWithoutLogsInput;
  };

  export type HabitLogUncheckedCreateWithoutUserInput = {
    id?: string;
    habitId: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
  };

  export type HabitLogCreateOrConnectWithoutUserInput = {
    where: HabitLogWhereUniqueInput;
    create: XOR<
      HabitLogCreateWithoutUserInput,
      HabitLogUncheckedCreateWithoutUserInput
    >;
  };

  export type HabitLogCreateManyUserInputEnvelope = {
    data: HabitLogCreateManyUserInput | HabitLogCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type DailyRoutineCreateWithoutUserInput = {
    id?: string;
    activities: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DailyRoutineUncheckedCreateWithoutUserInput = {
    id?: string;
    activities: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DailyRoutineCreateOrConnectWithoutUserInput = {
    where: DailyRoutineWhereUniqueInput;
    create: XOR<
      DailyRoutineCreateWithoutUserInput,
      DailyRoutineUncheckedCreateWithoutUserInput
    >;
  };

  export type UserCelebrationCreateWithoutUserInput = {
    id?: string;
    isDefault?: boolean;
    useCount?: number;
    celebrationMethod: CelebrationMethodCreateNestedOneWithoutUserFavoritesInput;
  };

  export type UserCelebrationUncheckedCreateWithoutUserInput = {
    id?: string;
    celebrationMethodId: string;
    isDefault?: boolean;
    useCount?: number;
  };

  export type UserCelebrationCreateOrConnectWithoutUserInput = {
    where: UserCelebrationWhereUniqueInput;
    create: XOR<
      UserCelebrationCreateWithoutUserInput,
      UserCelebrationUncheckedCreateWithoutUserInput
    >;
  };

  export type UserCelebrationCreateManyUserInputEnvelope = {
    data:
      | UserCelebrationCreateManyUserInput
      | UserCelebrationCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    update: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    data: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
  };

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput;
    data: XOR<
      AccountUpdateManyMutationInput,
      AccountUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[];
    OR?: AccountScalarWhereInput[];
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[];
    id?: StringFilter<"Account"> | string;
    userId?: StringFilter<"Account"> | string;
    type?: StringFilter<"Account"> | string;
    provider?: StringFilter<"Account"> | string;
    providerAccountId?: StringFilter<"Account"> | string;
    refresh_token?: StringNullableFilter<"Account"> | string | null;
    access_token?: StringNullableFilter<"Account"> | string | null;
    expires_at?: IntNullableFilter<"Account"> | number | null;
    token_type?: StringNullableFilter<"Account"> | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    id_token?: StringNullableFilter<"Account"> | string | null;
    session_state?: StringNullableFilter<"Account"> | string | null;
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<
      SessionUpdateManyMutationInput,
      SessionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<"Session"> | string;
    sessionToken?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    expires?: DateTimeFilter<"Session"> | Date | string;
  };

  export type AspirationUpsertWithWhereUniqueWithoutUserInput = {
    where: AspirationWhereUniqueInput;
    update: XOR<
      AspirationUpdateWithoutUserInput,
      AspirationUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AspirationCreateWithoutUserInput,
      AspirationUncheckedCreateWithoutUserInput
    >;
  };

  export type AspirationUpdateWithWhereUniqueWithoutUserInput = {
    where: AspirationWhereUniqueInput;
    data: XOR<
      AspirationUpdateWithoutUserInput,
      AspirationUncheckedUpdateWithoutUserInput
    >;
  };

  export type AspirationUpdateManyWithWhereWithoutUserInput = {
    where: AspirationScalarWhereInput;
    data: XOR<
      AspirationUpdateManyMutationInput,
      AspirationUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AspirationScalarWhereInput = {
    AND?: AspirationScalarWhereInput | AspirationScalarWhereInput[];
    OR?: AspirationScalarWhereInput[];
    NOT?: AspirationScalarWhereInput | AspirationScalarWhereInput[];
    id?: StringFilter<"Aspiration"> | string;
    userId?: StringFilter<"Aspiration"> | string;
    description?: StringFilter<"Aspiration"> | string;
    clarified?: StringNullableFilter<"Aspiration"> | string | null;
    category?: StringNullableFilter<"Aspiration"> | string | null;
    status?: EnumAspirationStatusFilter<"Aspiration"> | $Enums.AspirationStatus;
    progress?: IntFilter<"Aspiration"> | number;
    explorationData?: JsonNullableFilter<"Aspiration">;
    achievedAt?: DateTimeNullableFilter<"Aspiration"> | Date | string | null;
    createdAt?: DateTimeFilter<"Aspiration"> | Date | string;
    updatedAt?: DateTimeFilter<"Aspiration"> | Date | string;
  };

  export type HabitUpsertWithWhereUniqueWithoutUserInput = {
    where: HabitWhereUniqueInput;
    update: XOR<
      HabitUpdateWithoutUserInput,
      HabitUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      HabitCreateWithoutUserInput,
      HabitUncheckedCreateWithoutUserInput
    >;
  };

  export type HabitUpdateWithWhereUniqueWithoutUserInput = {
    where: HabitWhereUniqueInput;
    data: XOR<
      HabitUpdateWithoutUserInput,
      HabitUncheckedUpdateWithoutUserInput
    >;
  };

  export type HabitUpdateManyWithWhereWithoutUserInput = {
    where: HabitScalarWhereInput;
    data: XOR<
      HabitUpdateManyMutationInput,
      HabitUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type HabitScalarWhereInput = {
    AND?: HabitScalarWhereInput | HabitScalarWhereInput[];
    OR?: HabitScalarWhereInput[];
    NOT?: HabitScalarWhereInput | HabitScalarWhereInput[];
    id?: StringFilter<"Habit"> | string;
    userId?: StringFilter<"Habit"> | string;
    type?: EnumHabitTypeFilter<"Habit"> | $Enums.HabitType;
    name?: StringFilter<"Habit"> | string;
    description?: StringNullableFilter<"Habit"> | string | null;
    category?: StringNullableFilter<"Habit"> | string | null;
    anchor?: StringNullableFilter<"Habit"> | string | null;
    behavior?: StringNullableFilter<"Habit"> | string | null;
    celebration?: StringNullableFilter<"Habit"> | string | null;
    aspirationId?: StringNullableFilter<"Habit"> | string | null;
    currentPhase?: IntFilter<"Habit"> | number;
    status?: EnumHabitStatusFilter<"Habit"> | $Enums.HabitStatus;
    createdAt?: DateTimeFilter<"Habit"> | Date | string;
    updatedAt?: DateTimeFilter<"Habit"> | Date | string;
  };

  export type HabitLogUpsertWithWhereUniqueWithoutUserInput = {
    where: HabitLogWhereUniqueInput;
    update: XOR<
      HabitLogUpdateWithoutUserInput,
      HabitLogUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      HabitLogCreateWithoutUserInput,
      HabitLogUncheckedCreateWithoutUserInput
    >;
  };

  export type HabitLogUpdateWithWhereUniqueWithoutUserInput = {
    where: HabitLogWhereUniqueInput;
    data: XOR<
      HabitLogUpdateWithoutUserInput,
      HabitLogUncheckedUpdateWithoutUserInput
    >;
  };

  export type HabitLogUpdateManyWithWhereWithoutUserInput = {
    where: HabitLogScalarWhereInput;
    data: XOR<
      HabitLogUpdateManyMutationInput,
      HabitLogUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type HabitLogScalarWhereInput = {
    AND?: HabitLogScalarWhereInput | HabitLogScalarWhereInput[];
    OR?: HabitLogScalarWhereInput[];
    NOT?: HabitLogScalarWhereInput | HabitLogScalarWhereInput[];
    id?: StringFilter<"HabitLog"> | string;
    habitId?: StringFilter<"HabitLog"> | string;
    userId?: StringFilter<"HabitLog"> | string;
    loggedAt?: DateTimeFilter<"HabitLog"> | Date | string;
    completed?: BoolFilter<"HabitLog"> | boolean;
    completionLevel?:
      | EnumCompletionLevelFilter<"HabitLog">
      | $Enums.CompletionLevel;
    actualBehavior?: StringNullableFilter<"HabitLog"> | string | null;
    wantedMore?: BoolNullableFilter<"HabitLog"> | boolean | null;
    feltEasy?: BoolNullableFilter<"HabitLog"> | boolean | null;
    shineScore?: IntNullableFilter<"HabitLog"> | number | null;
    moodBefore?: IntNullableFilter<"HabitLog"> | number | null;
    moodAfter?: IntNullableFilter<"HabitLog"> | number | null;
    note?: StringNullableFilter<"HabitLog"> | string | null;
    createdAt?: DateTimeFilter<"HabitLog"> | Date | string;
  };

  export type DailyRoutineUpsertWithoutUserInput = {
    update: XOR<
      DailyRoutineUpdateWithoutUserInput,
      DailyRoutineUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      DailyRoutineCreateWithoutUserInput,
      DailyRoutineUncheckedCreateWithoutUserInput
    >;
    where?: DailyRoutineWhereInput;
  };

  export type DailyRoutineUpdateToOneWithWhereWithoutUserInput = {
    where?: DailyRoutineWhereInput;
    data: XOR<
      DailyRoutineUpdateWithoutUserInput,
      DailyRoutineUncheckedUpdateWithoutUserInput
    >;
  };

  export type DailyRoutineUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    activities?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DailyRoutineUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    activities?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCelebrationUpsertWithWhereUniqueWithoutUserInput = {
    where: UserCelebrationWhereUniqueInput;
    update: XOR<
      UserCelebrationUpdateWithoutUserInput,
      UserCelebrationUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      UserCelebrationCreateWithoutUserInput,
      UserCelebrationUncheckedCreateWithoutUserInput
    >;
  };

  export type UserCelebrationUpdateWithWhereUniqueWithoutUserInput = {
    where: UserCelebrationWhereUniqueInput;
    data: XOR<
      UserCelebrationUpdateWithoutUserInput,
      UserCelebrationUncheckedUpdateWithoutUserInput
    >;
  };

  export type UserCelebrationUpdateManyWithWhereWithoutUserInput = {
    where: UserCelebrationScalarWhereInput;
    data: XOR<
      UserCelebrationUpdateManyMutationInput,
      UserCelebrationUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type UserCelebrationScalarWhereInput = {
    AND?: UserCelebrationScalarWhereInput | UserCelebrationScalarWhereInput[];
    OR?: UserCelebrationScalarWhereInput[];
    NOT?: UserCelebrationScalarWhereInput | UserCelebrationScalarWhereInput[];
    id?: StringFilter<"UserCelebration"> | string;
    userId?: StringFilter<"UserCelebration"> | string;
    celebrationMethodId?: StringFilter<"UserCelebration"> | string;
    isDefault?: BoolFilter<"UserCelebration"> | boolean;
    useCount?: IntFilter<"UserCelebration"> | number;
  };

  export type UserCreateWithoutHabitsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    aspirations?: AspirationCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutHabitsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    aspirations?: AspirationUncheckedCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogUncheckedCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineUncheckedCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutHabitsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutHabitsInput,
      UserUncheckedCreateWithoutHabitsInput
    >;
  };

  export type AspirationCreateWithoutHabitsInput = {
    id?: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutAspirationsInput;
  };

  export type AspirationUncheckedCreateWithoutHabitsInput = {
    id?: string;
    userId: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AspirationCreateOrConnectWithoutHabitsInput = {
    where: AspirationWhereUniqueInput;
    create: XOR<
      AspirationCreateWithoutHabitsInput,
      AspirationUncheckedCreateWithoutHabitsInput
    >;
  };

  export type HabitLogCreateWithoutHabitInput = {
    id?: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutHabitLogsInput;
  };

  export type HabitLogUncheckedCreateWithoutHabitInput = {
    id?: string;
    userId: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
  };

  export type HabitLogCreateOrConnectWithoutHabitInput = {
    where: HabitLogWhereUniqueInput;
    create: XOR<
      HabitLogCreateWithoutHabitInput,
      HabitLogUncheckedCreateWithoutHabitInput
    >;
  };

  export type HabitLogCreateManyHabitInputEnvelope = {
    data: HabitLogCreateManyHabitInput | HabitLogCreateManyHabitInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutHabitsInput = {
    update: XOR<
      UserUpdateWithoutHabitsInput,
      UserUncheckedUpdateWithoutHabitsInput
    >;
    create: XOR<
      UserCreateWithoutHabitsInput,
      UserUncheckedCreateWithoutHabitsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutHabitsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutHabitsInput,
      UserUncheckedUpdateWithoutHabitsInput
    >;
  };

  export type UserUpdateWithoutHabitsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutHabitsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUncheckedUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUncheckedUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUncheckedUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type AspirationUpsertWithoutHabitsInput = {
    update: XOR<
      AspirationUpdateWithoutHabitsInput,
      AspirationUncheckedUpdateWithoutHabitsInput
    >;
    create: XOR<
      AspirationCreateWithoutHabitsInput,
      AspirationUncheckedCreateWithoutHabitsInput
    >;
    where?: AspirationWhereInput;
  };

  export type AspirationUpdateToOneWithWhereWithoutHabitsInput = {
    where?: AspirationWhereInput;
    data: XOR<
      AspirationUpdateWithoutHabitsInput,
      AspirationUncheckedUpdateWithoutHabitsInput
    >;
  };

  export type AspirationUpdateWithoutHabitsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAspirationsNestedInput;
  };

  export type AspirationUncheckedUpdateWithoutHabitsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitLogUpsertWithWhereUniqueWithoutHabitInput = {
    where: HabitLogWhereUniqueInput;
    update: XOR<
      HabitLogUpdateWithoutHabitInput,
      HabitLogUncheckedUpdateWithoutHabitInput
    >;
    create: XOR<
      HabitLogCreateWithoutHabitInput,
      HabitLogUncheckedCreateWithoutHabitInput
    >;
  };

  export type HabitLogUpdateWithWhereUniqueWithoutHabitInput = {
    where: HabitLogWhereUniqueInput;
    data: XOR<
      HabitLogUpdateWithoutHabitInput,
      HabitLogUncheckedUpdateWithoutHabitInput
    >;
  };

  export type HabitLogUpdateManyWithWhereWithoutHabitInput = {
    where: HabitLogScalarWhereInput;
    data: XOR<
      HabitLogUpdateManyMutationInput,
      HabitLogUncheckedUpdateManyWithoutHabitInput
    >;
  };

  export type HabitCreateWithoutLogsInput = {
    id?: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutHabitsInput;
    aspiration?: AspirationCreateNestedOneWithoutHabitsInput;
  };

  export type HabitUncheckedCreateWithoutLogsInput = {
    id?: string;
    userId: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    aspirationId?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HabitCreateOrConnectWithoutLogsInput = {
    where: HabitWhereUniqueInput;
    create: XOR<
      HabitCreateWithoutLogsInput,
      HabitUncheckedCreateWithoutLogsInput
    >;
  };

  export type UserCreateWithoutHabitLogsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    aspirations?: AspirationCreateNestedManyWithoutUserInput;
    habits?: HabitCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutHabitLogsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    aspirations?: AspirationUncheckedCreateNestedManyWithoutUserInput;
    habits?: HabitUncheckedCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineUncheckedCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutHabitLogsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutHabitLogsInput,
      UserUncheckedCreateWithoutHabitLogsInput
    >;
  };

  export type HabitUpsertWithoutLogsInput = {
    update: XOR<
      HabitUpdateWithoutLogsInput,
      HabitUncheckedUpdateWithoutLogsInput
    >;
    create: XOR<
      HabitCreateWithoutLogsInput,
      HabitUncheckedCreateWithoutLogsInput
    >;
    where?: HabitWhereInput;
  };

  export type HabitUpdateToOneWithWhereWithoutLogsInput = {
    where?: HabitWhereInput;
    data: XOR<
      HabitUpdateWithoutLogsInput,
      HabitUncheckedUpdateWithoutLogsInput
    >;
  };

  export type HabitUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutHabitsNestedInput;
    aspiration?: AspirationUpdateOneWithoutHabitsNestedInput;
  };

  export type HabitUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    aspirationId?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUpsertWithoutHabitLogsInput = {
    update: XOR<
      UserUpdateWithoutHabitLogsInput,
      UserUncheckedUpdateWithoutHabitLogsInput
    >;
    create: XOR<
      UserCreateWithoutHabitLogsInput,
      UserUncheckedCreateWithoutHabitLogsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutHabitLogsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutHabitLogsInput,
      UserUncheckedUpdateWithoutHabitLogsInput
    >;
  };

  export type UserUpdateWithoutHabitLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUpdateManyWithoutUserNestedInput;
    habits?: HabitUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutHabitLogsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUncheckedUpdateManyWithoutUserNestedInput;
    habits?: HabitUncheckedUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUncheckedUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutAspirationsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    habits?: HabitCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAspirationsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    habits?: HabitUncheckedCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogUncheckedCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineUncheckedCreateNestedOneWithoutUserInput;
    celebrations?: UserCelebrationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAspirationsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAspirationsInput,
      UserUncheckedCreateWithoutAspirationsInput
    >;
  };

  export type HabitCreateWithoutAspirationInput = {
    id?: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutHabitsInput;
    logs?: HabitLogCreateNestedManyWithoutHabitInput;
  };

  export type HabitUncheckedCreateWithoutAspirationInput = {
    id?: string;
    userId: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logs?: HabitLogUncheckedCreateNestedManyWithoutHabitInput;
  };

  export type HabitCreateOrConnectWithoutAspirationInput = {
    where: HabitWhereUniqueInput;
    create: XOR<
      HabitCreateWithoutAspirationInput,
      HabitUncheckedCreateWithoutAspirationInput
    >;
  };

  export type HabitCreateManyAspirationInputEnvelope = {
    data: HabitCreateManyAspirationInput | HabitCreateManyAspirationInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutAspirationsInput = {
    update: XOR<
      UserUpdateWithoutAspirationsInput,
      UserUncheckedUpdateWithoutAspirationsInput
    >;
    create: XOR<
      UserCreateWithoutAspirationsInput,
      UserUncheckedCreateWithoutAspirationsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAspirationsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAspirationsInput,
      UserUncheckedUpdateWithoutAspirationsInput
    >;
  };

  export type UserUpdateWithoutAspirationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    habits?: HabitUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAspirationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    habits?: HabitUncheckedUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUncheckedUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUncheckedUpdateOneWithoutUserNestedInput;
    celebrations?: UserCelebrationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type HabitUpsertWithWhereUniqueWithoutAspirationInput = {
    where: HabitWhereUniqueInput;
    update: XOR<
      HabitUpdateWithoutAspirationInput,
      HabitUncheckedUpdateWithoutAspirationInput
    >;
    create: XOR<
      HabitCreateWithoutAspirationInput,
      HabitUncheckedCreateWithoutAspirationInput
    >;
  };

  export type HabitUpdateWithWhereUniqueWithoutAspirationInput = {
    where: HabitWhereUniqueInput;
    data: XOR<
      HabitUpdateWithoutAspirationInput,
      HabitUncheckedUpdateWithoutAspirationInput
    >;
  };

  export type HabitUpdateManyWithWhereWithoutAspirationInput = {
    where: HabitScalarWhereInput;
    data: XOR<
      HabitUpdateManyMutationInput,
      HabitUncheckedUpdateManyWithoutAspirationInput
    >;
  };

  export type UserCelebrationCreateWithoutCelebrationMethodInput = {
    id?: string;
    isDefault?: boolean;
    useCount?: number;
    user: UserCreateNestedOneWithoutCelebrationsInput;
  };

  export type UserCelebrationUncheckedCreateWithoutCelebrationMethodInput = {
    id?: string;
    userId: string;
    isDefault?: boolean;
    useCount?: number;
  };

  export type UserCelebrationCreateOrConnectWithoutCelebrationMethodInput = {
    where: UserCelebrationWhereUniqueInput;
    create: XOR<
      UserCelebrationCreateWithoutCelebrationMethodInput,
      UserCelebrationUncheckedCreateWithoutCelebrationMethodInput
    >;
  };

  export type UserCelebrationCreateManyCelebrationMethodInputEnvelope = {
    data:
      | UserCelebrationCreateManyCelebrationMethodInput
      | UserCelebrationCreateManyCelebrationMethodInput[];
    skipDuplicates?: boolean;
  };

  export type UserCelebrationUpsertWithWhereUniqueWithoutCelebrationMethodInput =
    {
      where: UserCelebrationWhereUniqueInput;
      update: XOR<
        UserCelebrationUpdateWithoutCelebrationMethodInput,
        UserCelebrationUncheckedUpdateWithoutCelebrationMethodInput
      >;
      create: XOR<
        UserCelebrationCreateWithoutCelebrationMethodInput,
        UserCelebrationUncheckedCreateWithoutCelebrationMethodInput
      >;
    };

  export type UserCelebrationUpdateWithWhereUniqueWithoutCelebrationMethodInput =
    {
      where: UserCelebrationWhereUniqueInput;
      data: XOR<
        UserCelebrationUpdateWithoutCelebrationMethodInput,
        UserCelebrationUncheckedUpdateWithoutCelebrationMethodInput
      >;
    };

  export type UserCelebrationUpdateManyWithWhereWithoutCelebrationMethodInput =
    {
      where: UserCelebrationScalarWhereInput;
      data: XOR<
        UserCelebrationUpdateManyMutationInput,
        UserCelebrationUncheckedUpdateManyWithoutCelebrationMethodInput
      >;
    };

  export type UserCreateWithoutCelebrationsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    aspirations?: AspirationCreateNestedManyWithoutUserInput;
    habits?: HabitCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineCreateNestedOneWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutCelebrationsInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    aspirations?: AspirationUncheckedCreateNestedManyWithoutUserInput;
    habits?: HabitUncheckedCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogUncheckedCreateNestedManyWithoutUserInput;
    routine?: DailyRoutineUncheckedCreateNestedOneWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutCelebrationsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutCelebrationsInput,
      UserUncheckedCreateWithoutCelebrationsInput
    >;
  };

  export type CelebrationMethodCreateWithoutUserFavoritesInput = {
    id?: string;
    category: $Enums.CelebrationCategory;
    content: string;
    emoji?: string | null;
    isBuiltIn?: boolean;
  };

  export type CelebrationMethodUncheckedCreateWithoutUserFavoritesInput = {
    id?: string;
    category: $Enums.CelebrationCategory;
    content: string;
    emoji?: string | null;
    isBuiltIn?: boolean;
  };

  export type CelebrationMethodCreateOrConnectWithoutUserFavoritesInput = {
    where: CelebrationMethodWhereUniqueInput;
    create: XOR<
      CelebrationMethodCreateWithoutUserFavoritesInput,
      CelebrationMethodUncheckedCreateWithoutUserFavoritesInput
    >;
  };

  export type UserUpsertWithoutCelebrationsInput = {
    update: XOR<
      UserUpdateWithoutCelebrationsInput,
      UserUncheckedUpdateWithoutCelebrationsInput
    >;
    create: XOR<
      UserCreateWithoutCelebrationsInput,
      UserUncheckedCreateWithoutCelebrationsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutCelebrationsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutCelebrationsInput,
      UserUncheckedUpdateWithoutCelebrationsInput
    >;
  };

  export type UserUpdateWithoutCelebrationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUpdateManyWithoutUserNestedInput;
    habits?: HabitUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUpdateOneWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutCelebrationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUncheckedUpdateManyWithoutUserNestedInput;
    habits?: HabitUncheckedUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUncheckedUpdateManyWithoutUserNestedInput;
    routine?: DailyRoutineUncheckedUpdateOneWithoutUserNestedInput;
  };

  export type CelebrationMethodUpsertWithoutUserFavoritesInput = {
    update: XOR<
      CelebrationMethodUpdateWithoutUserFavoritesInput,
      CelebrationMethodUncheckedUpdateWithoutUserFavoritesInput
    >;
    create: XOR<
      CelebrationMethodCreateWithoutUserFavoritesInput,
      CelebrationMethodUncheckedCreateWithoutUserFavoritesInput
    >;
    where?: CelebrationMethodWhereInput;
  };

  export type CelebrationMethodUpdateToOneWithWhereWithoutUserFavoritesInput = {
    where?: CelebrationMethodWhereInput;
    data: XOR<
      CelebrationMethodUpdateWithoutUserFavoritesInput,
      CelebrationMethodUncheckedUpdateWithoutUserFavoritesInput
    >;
  };

  export type CelebrationMethodUpdateWithoutUserFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    category?:
      | EnumCelebrationCategoryFieldUpdateOperationsInput
      | $Enums.CelebrationCategory;
    content?: StringFieldUpdateOperationsInput | string;
    emoji?: NullableStringFieldUpdateOperationsInput | string | null;
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type CelebrationMethodUncheckedUpdateWithoutUserFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    category?:
      | EnumCelebrationCategoryFieldUpdateOperationsInput
      | $Enums.CelebrationCategory;
    content?: StringFieldUpdateOperationsInput | string;
    emoji?: NullableStringFieldUpdateOperationsInput | string | null;
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type UserCreateWithoutRoutineInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    aspirations?: AspirationCreateNestedManyWithoutUserInput;
    habits?: HabitCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogCreateNestedManyWithoutUserInput;
    celebrations?: UserCelebrationCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutRoutineInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | string | null;
    image?: string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    aspirations?: AspirationUncheckedCreateNestedManyWithoutUserInput;
    habits?: HabitUncheckedCreateNestedManyWithoutUserInput;
    habitLogs?: HabitLogUncheckedCreateNestedManyWithoutUserInput;
    celebrations?: UserCelebrationUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutRoutineInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutRoutineInput,
      UserUncheckedCreateWithoutRoutineInput
    >;
  };

  export type UserUpsertWithoutRoutineInput = {
    update: XOR<
      UserUpdateWithoutRoutineInput,
      UserUncheckedUpdateWithoutRoutineInput
    >;
    create: XOR<
      UserCreateWithoutRoutineInput,
      UserUncheckedCreateWithoutRoutineInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutRoutineInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutRoutineInput,
      UserUncheckedUpdateWithoutRoutineInput
    >;
  };

  export type UserUpdateWithoutRoutineInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUpdateManyWithoutUserNestedInput;
    habits?: HabitUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUpdateManyWithoutUserNestedInput;
    celebrations?: UserCelebrationUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutRoutineInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    aspirations?: AspirationUncheckedUpdateManyWithoutUserNestedInput;
    habits?: HabitUncheckedUpdateManyWithoutUserNestedInput;
    habitLogs?: HabitLogUncheckedUpdateManyWithoutUserNestedInput;
    celebrations?: UserCelebrationUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type AccountCreateManyUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    refresh_token_expires_in?: number | null;
  };

  export type SessionCreateManyUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
  };

  export type AspirationCreateManyUserInput = {
    id?: string;
    description: string;
    clarified?: string | null;
    category?: string | null;
    status?: $Enums.AspirationStatus;
    progress?: number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HabitCreateManyUserInput = {
    id?: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    aspirationId?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HabitLogCreateManyUserInput = {
    id?: string;
    habitId: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
  };

  export type UserCelebrationCreateManyUserInput = {
    id?: string;
    celebrationMethodId: string;
    isDefault?: boolean;
    useCount?: number;
  };

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    refresh_token_expires_in?:
      | NullableIntFieldUpdateOperationsInput
      | number
      | null;
  };

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    refresh_token_expires_in?:
      | NullableIntFieldUpdateOperationsInput
      | number
      | null;
  };

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    refresh_token_expires_in?:
      | NullableIntFieldUpdateOperationsInput
      | number
      | null;
  };

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AspirationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    habits?: HabitUpdateManyWithoutAspirationNestedInput;
  };

  export type AspirationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    habits?: HabitUncheckedUpdateManyWithoutAspirationNestedInput;
  };

  export type AspirationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    clarified?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumAspirationStatusFieldUpdateOperationsInput
      | $Enums.AspirationStatus;
    progress?: IntFieldUpdateOperationsInput | number;
    explorationData?: NullableJsonNullValueInput | InputJsonValue;
    achievedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    aspiration?: AspirationUpdateOneWithoutHabitsNestedInput;
    logs?: HabitLogUpdateManyWithoutHabitNestedInput;
  };

  export type HabitUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    aspirationId?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    logs?: HabitLogUncheckedUpdateManyWithoutHabitNestedInput;
  };

  export type HabitUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    aspirationId?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    habit?: HabitUpdateOneRequiredWithoutLogsNestedInput;
  };

  export type HabitLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    habitId?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    habitId?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCelebrationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
    celebrationMethod?: CelebrationMethodUpdateOneRequiredWithoutUserFavoritesNestedInput;
  };

  export type UserCelebrationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    celebrationMethodId?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
  };

  export type UserCelebrationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    celebrationMethodId?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
  };

  export type HabitLogCreateManyHabitInput = {
    id?: string;
    userId: string;
    loggedAt: Date | string;
    completed: boolean;
    completionLevel?: $Enums.CompletionLevel;
    actualBehavior?: string | null;
    wantedMore?: boolean | null;
    feltEasy?: boolean | null;
    shineScore?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
    note?: string | null;
    createdAt?: Date | string;
  };

  export type HabitLogUpdateWithoutHabitInput = {
    id?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutHabitLogsNestedInput;
  };

  export type HabitLogUncheckedUpdateWithoutHabitInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitLogUncheckedUpdateManyWithoutHabitInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    completionLevel?:
      | EnumCompletionLevelFieldUpdateOperationsInput
      | $Enums.CompletionLevel;
    actualBehavior?: NullableStringFieldUpdateOperationsInput | string | null;
    wantedMore?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    feltEasy?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    shineScore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodBefore?: NullableIntFieldUpdateOperationsInput | number | null;
    moodAfter?: NullableIntFieldUpdateOperationsInput | number | null;
    note?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HabitCreateManyAspirationInput = {
    id?: string;
    userId: string;
    type: $Enums.HabitType;
    name: string;
    description?: string | null;
    category?: string | null;
    anchor?: string | null;
    behavior?: string | null;
    celebration?: string | null;
    currentPhase?: number;
    status?: $Enums.HabitStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HabitUpdateWithoutAspirationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutHabitsNestedInput;
    logs?: HabitLogUpdateManyWithoutHabitNestedInput;
  };

  export type HabitUncheckedUpdateWithoutAspirationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    logs?: HabitLogUncheckedUpdateManyWithoutHabitNestedInput;
  };

  export type HabitUncheckedUpdateManyWithoutAspirationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: EnumHabitTypeFieldUpdateOperationsInput | $Enums.HabitType;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    anchor?: NullableStringFieldUpdateOperationsInput | string | null;
    behavior?: NullableStringFieldUpdateOperationsInput | string | null;
    celebration?: NullableStringFieldUpdateOperationsInput | string | null;
    currentPhase?: IntFieldUpdateOperationsInput | number;
    status?: EnumHabitStatusFieldUpdateOperationsInput | $Enums.HabitStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCelebrationCreateManyCelebrationMethodInput = {
    id?: string;
    userId: string;
    isDefault?: boolean;
    useCount?: number;
  };

  export type UserCelebrationUpdateWithoutCelebrationMethodInput = {
    id?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutCelebrationsNestedInput;
  };

  export type UserCelebrationUncheckedUpdateWithoutCelebrationMethodInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    useCount?: IntFieldUpdateOperationsInput | number;
  };

  export type UserCelebrationUncheckedUpdateManyWithoutCelebrationMethodInput =
    {
      id?: StringFieldUpdateOperationsInput | string;
      userId?: StringFieldUpdateOperationsInput | string;
      isDefault?: BoolFieldUpdateOperationsInput | boolean;
      useCount?: IntFieldUpdateOperationsInput | number;
    };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
