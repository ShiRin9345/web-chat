
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model NewFriendRequest
 * 
 */
export type NewFriendRequest = $Result.DefaultSelection<Prisma.$NewFriendRequestPayload>
/**
 * Model GroupMessage
 * 
 */
export type GroupMessage = $Result.DefaultSelection<Prisma.$GroupMessagePayload>
/**
 * Model PrivateMessage
 * 
 */
export type PrivateMessage = $Result.DefaultSelection<Prisma.$PrivateMessagePayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MessageType: {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  PDF: 'PDF'
};

export type MessageType = (typeof MessageType)[keyof typeof MessageType]


export const RequestState: {
  PENDING: 'PENDING',
  AGREED: 'AGREED',
  REJECTED: 'REJECTED'
};

export type RequestState = (typeof RequestState)[keyof typeof RequestState]

}

export type MessageType = $Enums.MessageType

export const MessageType: typeof $Enums.MessageType

export type RequestState = $Enums.RequestState

export const RequestState: typeof $Enums.RequestState

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

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
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newFriendRequest`: Exposes CRUD operations for the **NewFriendRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewFriendRequests
    * const newFriendRequests = await prisma.newFriendRequest.findMany()
    * ```
    */
  get newFriendRequest(): Prisma.NewFriendRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupMessage`: Exposes CRUD operations for the **GroupMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupMessages
    * const groupMessages = await prisma.groupMessage.findMany()
    * ```
    */
  get groupMessage(): Prisma.GroupMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.privateMessage`: Exposes CRUD operations for the **PrivateMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PrivateMessages
    * const privateMessages = await prisma.privateMessage.findMany()
    * ```
    */
  get privateMessage(): Prisma.PrivateMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Group: 'Group',
    NewFriendRequest: 'NewFriendRequest',
    GroupMessage: 'GroupMessage',
    PrivateMessage: 'PrivateMessage',
    Conversation: 'Conversation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "group" | "newFriendRequest" | "groupMessage" | "privateMessage" | "conversation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      NewFriendRequest: {
        payload: Prisma.$NewFriendRequestPayload<ExtArgs>
        fields: Prisma.NewFriendRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewFriendRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewFriendRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>
          }
          findFirst: {
            args: Prisma.NewFriendRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewFriendRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>
          }
          findMany: {
            args: Prisma.NewFriendRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>[]
          }
          create: {
            args: Prisma.NewFriendRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>
          }
          createMany: {
            args: Prisma.NewFriendRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewFriendRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>[]
          }
          delete: {
            args: Prisma.NewFriendRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>
          }
          update: {
            args: Prisma.NewFriendRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>
          }
          deleteMany: {
            args: Prisma.NewFriendRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewFriendRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewFriendRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>[]
          }
          upsert: {
            args: Prisma.NewFriendRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewFriendRequestPayload>
          }
          aggregate: {
            args: Prisma.NewFriendRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewFriendRequest>
          }
          groupBy: {
            args: Prisma.NewFriendRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewFriendRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewFriendRequestCountArgs<ExtArgs>
            result: $Utils.Optional<NewFriendRequestCountAggregateOutputType> | number
          }
        }
      }
      GroupMessage: {
        payload: Prisma.$GroupMessagePayload<ExtArgs>
        fields: Prisma.GroupMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          findFirst: {
            args: Prisma.GroupMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          findMany: {
            args: Prisma.GroupMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>[]
          }
          create: {
            args: Prisma.GroupMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          createMany: {
            args: Prisma.GroupMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>[]
          }
          delete: {
            args: Prisma.GroupMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          update: {
            args: Prisma.GroupMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          deleteMany: {
            args: Prisma.GroupMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>[]
          }
          upsert: {
            args: Prisma.GroupMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          aggregate: {
            args: Prisma.GroupMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupMessage>
          }
          groupBy: {
            args: Prisma.GroupMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupMessageCountArgs<ExtArgs>
            result: $Utils.Optional<GroupMessageCountAggregateOutputType> | number
          }
        }
      }
      PrivateMessage: {
        payload: Prisma.$PrivateMessagePayload<ExtArgs>
        fields: Prisma.PrivateMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrivateMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrivateMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>
          }
          findFirst: {
            args: Prisma.PrivateMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrivateMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>
          }
          findMany: {
            args: Prisma.PrivateMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>[]
          }
          create: {
            args: Prisma.PrivateMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>
          }
          createMany: {
            args: Prisma.PrivateMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrivateMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>[]
          }
          delete: {
            args: Prisma.PrivateMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>
          }
          update: {
            args: Prisma.PrivateMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>
          }
          deleteMany: {
            args: Prisma.PrivateMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrivateMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrivateMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>[]
          }
          upsert: {
            args: Prisma.PrivateMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrivateMessagePayload>
          }
          aggregate: {
            args: Prisma.PrivateMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrivateMessage>
          }
          groupBy: {
            args: Prisma.PrivateMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrivateMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrivateMessageCountArgs<ExtArgs>
            result: $Utils.Optional<PrivateMessageCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
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
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    group?: GroupOmit
    newFriendRequest?: NewFriendRequestOmit
    groupMessage?: GroupMessageOmit
    privateMessage?: PrivateMessageOmit
    conversation?: ConversationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    groupMessage: number
    groups: number
    sentPrivateMessage: number
    receivedPrivateMessage: number
    conversations: number
    NewFriendSendRequest: number
    NewFriendReceiveRequest: number
    friends: number
    friendOf: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupMessage?: boolean | UserCountOutputTypeCountGroupMessageArgs
    groups?: boolean | UserCountOutputTypeCountGroupsArgs
    sentPrivateMessage?: boolean | UserCountOutputTypeCountSentPrivateMessageArgs
    receivedPrivateMessage?: boolean | UserCountOutputTypeCountReceivedPrivateMessageArgs
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    NewFriendSendRequest?: boolean | UserCountOutputTypeCountNewFriendSendRequestArgs
    NewFriendReceiveRequest?: boolean | UserCountOutputTypeCountNewFriendReceiveRequestArgs
    friends?: boolean | UserCountOutputTypeCountFriendsArgs
    friendOf?: boolean | UserCountOutputTypeCountFriendOfArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentPrivateMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrivateMessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedPrivateMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrivateMessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNewFriendSendRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewFriendRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNewFriendReceiveRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewFriendRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    groupMessages: number
    members: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupMessages?: boolean | GroupCountOutputTypeCountGroupMessagesArgs
    members?: boolean | GroupCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountGroupMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMessageWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
    members: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
    members?: boolean | ConversationCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrivateMessageWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    imageUrl: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    imageUrl: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    imageUrl: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    imageUrl?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    imageUrl?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    imageUrl?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    userId: string
    fullName: string
    imageUrl: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    imageUrl?: boolean
    groupMessage?: boolean | User$groupMessageArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    sentPrivateMessage?: boolean | User$sentPrivateMessageArgs<ExtArgs>
    receivedPrivateMessage?: boolean | User$receivedPrivateMessageArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    NewFriendSendRequest?: boolean | User$NewFriendSendRequestArgs<ExtArgs>
    NewFriendReceiveRequest?: boolean | User$NewFriendReceiveRequestArgs<ExtArgs>
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    imageUrl?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    imageUrl?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    imageUrl?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fullName" | "imageUrl", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupMessage?: boolean | User$groupMessageArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    sentPrivateMessage?: boolean | User$sentPrivateMessageArgs<ExtArgs>
    receivedPrivateMessage?: boolean | User$receivedPrivateMessageArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    NewFriendSendRequest?: boolean | User$NewFriendSendRequestArgs<ExtArgs>
    NewFriendReceiveRequest?: boolean | User$NewFriendReceiveRequestArgs<ExtArgs>
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      groupMessage: Prisma.$GroupMessagePayload<ExtArgs>[]
      groups: Prisma.$GroupPayload<ExtArgs>[]
      sentPrivateMessage: Prisma.$PrivateMessagePayload<ExtArgs>[]
      receivedPrivateMessage: Prisma.$PrivateMessagePayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      NewFriendSendRequest: Prisma.$NewFriendRequestPayload<ExtArgs>[]
      NewFriendReceiveRequest: Prisma.$NewFriendRequestPayload<ExtArgs>[]
      friends: Prisma.$UserPayload<ExtArgs>[]
      friendOf: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fullName: string
      imageUrl: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groupMessage<T extends User$groupMessageArgs<ExtArgs> = {}>(args?: Subset<T, User$groupMessageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groups<T extends User$groupsArgs<ExtArgs> = {}>(args?: Subset<T, User$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentPrivateMessage<T extends User$sentPrivateMessageArgs<ExtArgs> = {}>(args?: Subset<T, User$sentPrivateMessageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedPrivateMessage<T extends User$receivedPrivateMessageArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedPrivateMessageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    NewFriendSendRequest<T extends User$NewFriendSendRequestArgs<ExtArgs> = {}>(args?: Subset<T, User$NewFriendSendRequestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    NewFriendReceiveRequest<T extends User$NewFriendReceiveRequestArgs<ExtArgs> = {}>(args?: Subset<T, User$NewFriendReceiveRequestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friends<T extends User$friendsArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendOf<T extends User$friendOfArgs<ExtArgs> = {}>(args?: Subset<T, User$friendOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly userId: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.groupMessage
   */
  export type User$groupMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    where?: GroupMessageWhereInput
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    cursor?: GroupMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * User.groups
   */
  export type User$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    cursor?: GroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * User.sentPrivateMessage
   */
  export type User$sentPrivateMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    where?: PrivateMessageWhereInput
    orderBy?: PrivateMessageOrderByWithRelationInput | PrivateMessageOrderByWithRelationInput[]
    cursor?: PrivateMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrivateMessageScalarFieldEnum | PrivateMessageScalarFieldEnum[]
  }

  /**
   * User.receivedPrivateMessage
   */
  export type User$receivedPrivateMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    where?: PrivateMessageWhereInput
    orderBy?: PrivateMessageOrderByWithRelationInput | PrivateMessageOrderByWithRelationInput[]
    cursor?: PrivateMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrivateMessageScalarFieldEnum | PrivateMessageScalarFieldEnum[]
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User.NewFriendSendRequest
   */
  export type User$NewFriendSendRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    where?: NewFriendRequestWhereInput
    orderBy?: NewFriendRequestOrderByWithRelationInput | NewFriendRequestOrderByWithRelationInput[]
    cursor?: NewFriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NewFriendRequestScalarFieldEnum | NewFriendRequestScalarFieldEnum[]
  }

  /**
   * User.NewFriendReceiveRequest
   */
  export type User$NewFriendReceiveRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    where?: NewFriendRequestWhereInput
    orderBy?: NewFriendRequestOrderByWithRelationInput | NewFriendRequestOrderByWithRelationInput[]
    cursor?: NewFriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NewFriendRequestScalarFieldEnum | NewFriendRequestScalarFieldEnum[]
  }

  /**
   * User.friends
   */
  export type User$friendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.friendOf
   */
  export type User$friendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    groupMessages?: boolean | Group$groupMessagesArgs<ExtArgs>
    members?: boolean | Group$membersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["group"]>

  export type GroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupMessages?: boolean | Group$groupMessagesArgs<ExtArgs>
    members?: boolean | Group$membersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      groupMessages: Prisma.$GroupMessagePayload<ExtArgs>[]
      members: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groupMessages<T extends Group$groupMessagesArgs<ExtArgs> = {}>(args?: Subset<T, Group$groupMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Group$membersArgs<ExtArgs> = {}>(args?: Subset<T, Group$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
    readonly updatedAt: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group updateManyAndReturn
   */
  export type GroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.groupMessages
   */
  export type Group$groupMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    where?: GroupMessageWhereInput
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    cursor?: GroupMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * Group.members
   */
  export type Group$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model NewFriendRequest
   */

  export type AggregateNewFriendRequest = {
    _count: NewFriendRequestCountAggregateOutputType | null
    _min: NewFriendRequestMinAggregateOutputType | null
    _max: NewFriendRequestMaxAggregateOutputType | null
  }

  export type NewFriendRequestMinAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    state: $Enums.RequestState | null
  }

  export type NewFriendRequestMaxAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    state: $Enums.RequestState | null
  }

  export type NewFriendRequestCountAggregateOutputType = {
    id: number
    fromUserId: number
    toUserId: number
    createdAt: number
    updatedAt: number
    state: number
    _all: number
  }


  export type NewFriendRequestMinAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    createdAt?: true
    updatedAt?: true
    state?: true
  }

  export type NewFriendRequestMaxAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    createdAt?: true
    updatedAt?: true
    state?: true
  }

  export type NewFriendRequestCountAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    createdAt?: true
    updatedAt?: true
    state?: true
    _all?: true
  }

  export type NewFriendRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewFriendRequest to aggregate.
     */
    where?: NewFriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewFriendRequests to fetch.
     */
    orderBy?: NewFriendRequestOrderByWithRelationInput | NewFriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewFriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewFriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewFriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewFriendRequests
    **/
    _count?: true | NewFriendRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewFriendRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewFriendRequestMaxAggregateInputType
  }

  export type GetNewFriendRequestAggregateType<T extends NewFriendRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateNewFriendRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewFriendRequest[P]>
      : GetScalarType<T[P], AggregateNewFriendRequest[P]>
  }




  export type NewFriendRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewFriendRequestWhereInput
    orderBy?: NewFriendRequestOrderByWithAggregationInput | NewFriendRequestOrderByWithAggregationInput[]
    by: NewFriendRequestScalarFieldEnum[] | NewFriendRequestScalarFieldEnum
    having?: NewFriendRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewFriendRequestCountAggregateInputType | true
    _min?: NewFriendRequestMinAggregateInputType
    _max?: NewFriendRequestMaxAggregateInputType
  }

  export type NewFriendRequestGroupByOutputType = {
    id: string
    fromUserId: string
    toUserId: string
    createdAt: Date
    updatedAt: Date
    state: $Enums.RequestState
    _count: NewFriendRequestCountAggregateOutputType | null
    _min: NewFriendRequestMinAggregateOutputType | null
    _max: NewFriendRequestMaxAggregateOutputType | null
  }

  type GetNewFriendRequestGroupByPayload<T extends NewFriendRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewFriendRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewFriendRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewFriendRequestGroupByOutputType[P]>
            : GetScalarType<T[P], NewFriendRequestGroupByOutputType[P]>
        }
      >
    >


  export type NewFriendRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    state?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["newFriendRequest"]>

  export type NewFriendRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    state?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["newFriendRequest"]>

  export type NewFriendRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    state?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["newFriendRequest"]>

  export type NewFriendRequestSelectScalar = {
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    state?: boolean
  }

  export type NewFriendRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromUserId" | "toUserId" | "createdAt" | "updatedAt" | "state", ExtArgs["result"]["newFriendRequest"]>
  export type NewFriendRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NewFriendRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NewFriendRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NewFriendRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewFriendRequest"
    objects: {
      from: Prisma.$UserPayload<ExtArgs>
      to: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromUserId: string
      toUserId: string
      createdAt: Date
      updatedAt: Date
      state: $Enums.RequestState
    }, ExtArgs["result"]["newFriendRequest"]>
    composites: {}
  }

  type NewFriendRequestGetPayload<S extends boolean | null | undefined | NewFriendRequestDefaultArgs> = $Result.GetResult<Prisma.$NewFriendRequestPayload, S>

  type NewFriendRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewFriendRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewFriendRequestCountAggregateInputType | true
    }

  export interface NewFriendRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewFriendRequest'], meta: { name: 'NewFriendRequest' } }
    /**
     * Find zero or one NewFriendRequest that matches the filter.
     * @param {NewFriendRequestFindUniqueArgs} args - Arguments to find a NewFriendRequest
     * @example
     * // Get one NewFriendRequest
     * const newFriendRequest = await prisma.newFriendRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewFriendRequestFindUniqueArgs>(args: SelectSubset<T, NewFriendRequestFindUniqueArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewFriendRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewFriendRequestFindUniqueOrThrowArgs} args - Arguments to find a NewFriendRequest
     * @example
     * // Get one NewFriendRequest
     * const newFriendRequest = await prisma.newFriendRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewFriendRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, NewFriendRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewFriendRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFriendRequestFindFirstArgs} args - Arguments to find a NewFriendRequest
     * @example
     * // Get one NewFriendRequest
     * const newFriendRequest = await prisma.newFriendRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewFriendRequestFindFirstArgs>(args?: SelectSubset<T, NewFriendRequestFindFirstArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewFriendRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFriendRequestFindFirstOrThrowArgs} args - Arguments to find a NewFriendRequest
     * @example
     * // Get one NewFriendRequest
     * const newFriendRequest = await prisma.newFriendRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewFriendRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, NewFriendRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewFriendRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFriendRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewFriendRequests
     * const newFriendRequests = await prisma.newFriendRequest.findMany()
     * 
     * // Get first 10 NewFriendRequests
     * const newFriendRequests = await prisma.newFriendRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newFriendRequestWithIdOnly = await prisma.newFriendRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewFriendRequestFindManyArgs>(args?: SelectSubset<T, NewFriendRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewFriendRequest.
     * @param {NewFriendRequestCreateArgs} args - Arguments to create a NewFriendRequest.
     * @example
     * // Create one NewFriendRequest
     * const NewFriendRequest = await prisma.newFriendRequest.create({
     *   data: {
     *     // ... data to create a NewFriendRequest
     *   }
     * })
     * 
     */
    create<T extends NewFriendRequestCreateArgs>(args: SelectSubset<T, NewFriendRequestCreateArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewFriendRequests.
     * @param {NewFriendRequestCreateManyArgs} args - Arguments to create many NewFriendRequests.
     * @example
     * // Create many NewFriendRequests
     * const newFriendRequest = await prisma.newFriendRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewFriendRequestCreateManyArgs>(args?: SelectSubset<T, NewFriendRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewFriendRequests and returns the data saved in the database.
     * @param {NewFriendRequestCreateManyAndReturnArgs} args - Arguments to create many NewFriendRequests.
     * @example
     * // Create many NewFriendRequests
     * const newFriendRequest = await prisma.newFriendRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewFriendRequests and only return the `id`
     * const newFriendRequestWithIdOnly = await prisma.newFriendRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewFriendRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, NewFriendRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewFriendRequest.
     * @param {NewFriendRequestDeleteArgs} args - Arguments to delete one NewFriendRequest.
     * @example
     * // Delete one NewFriendRequest
     * const NewFriendRequest = await prisma.newFriendRequest.delete({
     *   where: {
     *     // ... filter to delete one NewFriendRequest
     *   }
     * })
     * 
     */
    delete<T extends NewFriendRequestDeleteArgs>(args: SelectSubset<T, NewFriendRequestDeleteArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewFriendRequest.
     * @param {NewFriendRequestUpdateArgs} args - Arguments to update one NewFriendRequest.
     * @example
     * // Update one NewFriendRequest
     * const newFriendRequest = await prisma.newFriendRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewFriendRequestUpdateArgs>(args: SelectSubset<T, NewFriendRequestUpdateArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewFriendRequests.
     * @param {NewFriendRequestDeleteManyArgs} args - Arguments to filter NewFriendRequests to delete.
     * @example
     * // Delete a few NewFriendRequests
     * const { count } = await prisma.newFriendRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewFriendRequestDeleteManyArgs>(args?: SelectSubset<T, NewFriendRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewFriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFriendRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewFriendRequests
     * const newFriendRequest = await prisma.newFriendRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewFriendRequestUpdateManyArgs>(args: SelectSubset<T, NewFriendRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewFriendRequests and returns the data updated in the database.
     * @param {NewFriendRequestUpdateManyAndReturnArgs} args - Arguments to update many NewFriendRequests.
     * @example
     * // Update many NewFriendRequests
     * const newFriendRequest = await prisma.newFriendRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewFriendRequests and only return the `id`
     * const newFriendRequestWithIdOnly = await prisma.newFriendRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends NewFriendRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, NewFriendRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewFriendRequest.
     * @param {NewFriendRequestUpsertArgs} args - Arguments to update or create a NewFriendRequest.
     * @example
     * // Update or create a NewFriendRequest
     * const newFriendRequest = await prisma.newFriendRequest.upsert({
     *   create: {
     *     // ... data to create a NewFriendRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewFriendRequest we want to update
     *   }
     * })
     */
    upsert<T extends NewFriendRequestUpsertArgs>(args: SelectSubset<T, NewFriendRequestUpsertArgs<ExtArgs>>): Prisma__NewFriendRequestClient<$Result.GetResult<Prisma.$NewFriendRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewFriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFriendRequestCountArgs} args - Arguments to filter NewFriendRequests to count.
     * @example
     * // Count the number of NewFriendRequests
     * const count = await prisma.newFriendRequest.count({
     *   where: {
     *     // ... the filter for the NewFriendRequests we want to count
     *   }
     * })
    **/
    count<T extends NewFriendRequestCountArgs>(
      args?: Subset<T, NewFriendRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewFriendRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewFriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFriendRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NewFriendRequestAggregateArgs>(args: Subset<T, NewFriendRequestAggregateArgs>): Prisma.PrismaPromise<GetNewFriendRequestAggregateType<T>>

    /**
     * Group by NewFriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFriendRequestGroupByArgs} args - Group by arguments.
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
      T extends NewFriendRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewFriendRequestGroupByArgs['orderBy'] }
        : { orderBy?: NewFriendRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewFriendRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewFriendRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewFriendRequest model
   */
  readonly fields: NewFriendRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewFriendRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewFriendRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    from<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    to<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewFriendRequest model
   */
  interface NewFriendRequestFieldRefs {
    readonly id: FieldRef<"NewFriendRequest", 'String'>
    readonly fromUserId: FieldRef<"NewFriendRequest", 'String'>
    readonly toUserId: FieldRef<"NewFriendRequest", 'String'>
    readonly createdAt: FieldRef<"NewFriendRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"NewFriendRequest", 'DateTime'>
    readonly state: FieldRef<"NewFriendRequest", 'RequestState'>
  }
    

  // Custom InputTypes
  /**
   * NewFriendRequest findUnique
   */
  export type NewFriendRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which NewFriendRequest to fetch.
     */
    where: NewFriendRequestWhereUniqueInput
  }

  /**
   * NewFriendRequest findUniqueOrThrow
   */
  export type NewFriendRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which NewFriendRequest to fetch.
     */
    where: NewFriendRequestWhereUniqueInput
  }

  /**
   * NewFriendRequest findFirst
   */
  export type NewFriendRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which NewFriendRequest to fetch.
     */
    where?: NewFriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewFriendRequests to fetch.
     */
    orderBy?: NewFriendRequestOrderByWithRelationInput | NewFriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewFriendRequests.
     */
    cursor?: NewFriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewFriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewFriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewFriendRequests.
     */
    distinct?: NewFriendRequestScalarFieldEnum | NewFriendRequestScalarFieldEnum[]
  }

  /**
   * NewFriendRequest findFirstOrThrow
   */
  export type NewFriendRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which NewFriendRequest to fetch.
     */
    where?: NewFriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewFriendRequests to fetch.
     */
    orderBy?: NewFriendRequestOrderByWithRelationInput | NewFriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewFriendRequests.
     */
    cursor?: NewFriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewFriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewFriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewFriendRequests.
     */
    distinct?: NewFriendRequestScalarFieldEnum | NewFriendRequestScalarFieldEnum[]
  }

  /**
   * NewFriendRequest findMany
   */
  export type NewFriendRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which NewFriendRequests to fetch.
     */
    where?: NewFriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewFriendRequests to fetch.
     */
    orderBy?: NewFriendRequestOrderByWithRelationInput | NewFriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewFriendRequests.
     */
    cursor?: NewFriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewFriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewFriendRequests.
     */
    skip?: number
    distinct?: NewFriendRequestScalarFieldEnum | NewFriendRequestScalarFieldEnum[]
  }

  /**
   * NewFriendRequest create
   */
  export type NewFriendRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a NewFriendRequest.
     */
    data: XOR<NewFriendRequestCreateInput, NewFriendRequestUncheckedCreateInput>
  }

  /**
   * NewFriendRequest createMany
   */
  export type NewFriendRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewFriendRequests.
     */
    data: NewFriendRequestCreateManyInput | NewFriendRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewFriendRequest createManyAndReturn
   */
  export type NewFriendRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * The data used to create many NewFriendRequests.
     */
    data: NewFriendRequestCreateManyInput | NewFriendRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NewFriendRequest update
   */
  export type NewFriendRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a NewFriendRequest.
     */
    data: XOR<NewFriendRequestUpdateInput, NewFriendRequestUncheckedUpdateInput>
    /**
     * Choose, which NewFriendRequest to update.
     */
    where: NewFriendRequestWhereUniqueInput
  }

  /**
   * NewFriendRequest updateMany
   */
  export type NewFriendRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewFriendRequests.
     */
    data: XOR<NewFriendRequestUpdateManyMutationInput, NewFriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which NewFriendRequests to update
     */
    where?: NewFriendRequestWhereInput
    /**
     * Limit how many NewFriendRequests to update.
     */
    limit?: number
  }

  /**
   * NewFriendRequest updateManyAndReturn
   */
  export type NewFriendRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * The data used to update NewFriendRequests.
     */
    data: XOR<NewFriendRequestUpdateManyMutationInput, NewFriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which NewFriendRequests to update
     */
    where?: NewFriendRequestWhereInput
    /**
     * Limit how many NewFriendRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NewFriendRequest upsert
   */
  export type NewFriendRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the NewFriendRequest to update in case it exists.
     */
    where: NewFriendRequestWhereUniqueInput
    /**
     * In case the NewFriendRequest found by the `where` argument doesn't exist, create a new NewFriendRequest with this data.
     */
    create: XOR<NewFriendRequestCreateInput, NewFriendRequestUncheckedCreateInput>
    /**
     * In case the NewFriendRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewFriendRequestUpdateInput, NewFriendRequestUncheckedUpdateInput>
  }

  /**
   * NewFriendRequest delete
   */
  export type NewFriendRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
    /**
     * Filter which NewFriendRequest to delete.
     */
    where: NewFriendRequestWhereUniqueInput
  }

  /**
   * NewFriendRequest deleteMany
   */
  export type NewFriendRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewFriendRequests to delete
     */
    where?: NewFriendRequestWhereInput
    /**
     * Limit how many NewFriendRequests to delete.
     */
    limit?: number
  }

  /**
   * NewFriendRequest without action
   */
  export type NewFriendRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewFriendRequest
     */
    select?: NewFriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewFriendRequest
     */
    omit?: NewFriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewFriendRequestInclude<ExtArgs> | null
  }


  /**
   * Model GroupMessage
   */

  export type AggregateGroupMessage = {
    _count: GroupMessageCountAggregateOutputType | null
    _min: GroupMessageMinAggregateOutputType | null
    _max: GroupMessageMaxAggregateOutputType | null
  }

  export type GroupMessageMinAggregateOutputType = {
    id: string | null
    type: $Enums.MessageType | null
    content: string | null
    groupId: string | null
    senderId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMessageMaxAggregateOutputType = {
    id: string | null
    type: $Enums.MessageType | null
    content: string | null
    groupId: string | null
    senderId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMessageCountAggregateOutputType = {
    id: number
    type: number
    content: number
    groupId: number
    senderId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMessageMinAggregateInputType = {
    id?: true
    type?: true
    content?: true
    groupId?: true
    senderId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMessageMaxAggregateInputType = {
    id?: true
    type?: true
    content?: true
    groupId?: true
    senderId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMessageCountAggregateInputType = {
    id?: true
    type?: true
    content?: true
    groupId?: true
    senderId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMessage to aggregate.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupMessages
    **/
    _count?: true | GroupMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMessageMaxAggregateInputType
  }

  export type GetGroupMessageAggregateType<T extends GroupMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupMessage[P]>
      : GetScalarType<T[P], AggregateGroupMessage[P]>
  }




  export type GroupMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMessageWhereInput
    orderBy?: GroupMessageOrderByWithAggregationInput | GroupMessageOrderByWithAggregationInput[]
    by: GroupMessageScalarFieldEnum[] | GroupMessageScalarFieldEnum
    having?: GroupMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupMessageCountAggregateInputType | true
    _min?: GroupMessageMinAggregateInputType
    _max?: GroupMessageMaxAggregateInputType
  }

  export type GroupMessageGroupByOutputType = {
    id: string
    type: $Enums.MessageType
    content: string
    groupId: string
    senderId: string
    createdAt: Date
    updatedAt: Date
    _count: GroupMessageCountAggregateOutputType | null
    _min: GroupMessageMinAggregateOutputType | null
    _max: GroupMessageMaxAggregateOutputType | null
  }

  type GetGroupMessageGroupByPayload<T extends GroupMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupMessageGroupByOutputType[P]>
            : GetScalarType<T[P], GroupMessageGroupByOutputType[P]>
        }
      >
    >


  export type GroupMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    groupId?: boolean
    senderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Group?: boolean | GroupDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMessage"]>

  export type GroupMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    groupId?: boolean
    senderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Group?: boolean | GroupDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMessage"]>

  export type GroupMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    groupId?: boolean
    senderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Group?: boolean | GroupDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMessage"]>

  export type GroupMessageSelectScalar = {
    id?: boolean
    type?: boolean
    content?: boolean
    groupId?: boolean
    senderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "content" | "groupId" | "senderId" | "createdAt" | "updatedAt", ExtArgs["result"]["groupMessage"]>
  export type GroupMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Group?: boolean | GroupDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GroupMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Group?: boolean | GroupDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GroupMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Group?: boolean | GroupDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GroupMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupMessage"
    objects: {
      Group: Prisma.$GroupPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.MessageType
      content: string
      groupId: string
      senderId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["groupMessage"]>
    composites: {}
  }

  type GroupMessageGetPayload<S extends boolean | null | undefined | GroupMessageDefaultArgs> = $Result.GetResult<Prisma.$GroupMessagePayload, S>

  type GroupMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupMessageCountAggregateInputType | true
    }

  export interface GroupMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupMessage'], meta: { name: 'GroupMessage' } }
    /**
     * Find zero or one GroupMessage that matches the filter.
     * @param {GroupMessageFindUniqueArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupMessageFindUniqueArgs>(args: SelectSubset<T, GroupMessageFindUniqueArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupMessageFindUniqueOrThrowArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageFindFirstArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupMessageFindFirstArgs>(args?: SelectSubset<T, GroupMessageFindFirstArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageFindFirstOrThrowArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupMessages
     * const groupMessages = await prisma.groupMessage.findMany()
     * 
     * // Get first 10 GroupMessages
     * const groupMessages = await prisma.groupMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupMessageWithIdOnly = await prisma.groupMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupMessageFindManyArgs>(args?: SelectSubset<T, GroupMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupMessage.
     * @param {GroupMessageCreateArgs} args - Arguments to create a GroupMessage.
     * @example
     * // Create one GroupMessage
     * const GroupMessage = await prisma.groupMessage.create({
     *   data: {
     *     // ... data to create a GroupMessage
     *   }
     * })
     * 
     */
    create<T extends GroupMessageCreateArgs>(args: SelectSubset<T, GroupMessageCreateArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupMessages.
     * @param {GroupMessageCreateManyArgs} args - Arguments to create many GroupMessages.
     * @example
     * // Create many GroupMessages
     * const groupMessage = await prisma.groupMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupMessageCreateManyArgs>(args?: SelectSubset<T, GroupMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupMessages and returns the data saved in the database.
     * @param {GroupMessageCreateManyAndReturnArgs} args - Arguments to create many GroupMessages.
     * @example
     * // Create many GroupMessages
     * const groupMessage = await prisma.groupMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupMessages and only return the `id`
     * const groupMessageWithIdOnly = await prisma.groupMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupMessage.
     * @param {GroupMessageDeleteArgs} args - Arguments to delete one GroupMessage.
     * @example
     * // Delete one GroupMessage
     * const GroupMessage = await prisma.groupMessage.delete({
     *   where: {
     *     // ... filter to delete one GroupMessage
     *   }
     * })
     * 
     */
    delete<T extends GroupMessageDeleteArgs>(args: SelectSubset<T, GroupMessageDeleteArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupMessage.
     * @param {GroupMessageUpdateArgs} args - Arguments to update one GroupMessage.
     * @example
     * // Update one GroupMessage
     * const groupMessage = await prisma.groupMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupMessageUpdateArgs>(args: SelectSubset<T, GroupMessageUpdateArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupMessages.
     * @param {GroupMessageDeleteManyArgs} args - Arguments to filter GroupMessages to delete.
     * @example
     * // Delete a few GroupMessages
     * const { count } = await prisma.groupMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupMessageDeleteManyArgs>(args?: SelectSubset<T, GroupMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupMessages
     * const groupMessage = await prisma.groupMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupMessageUpdateManyArgs>(args: SelectSubset<T, GroupMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMessages and returns the data updated in the database.
     * @param {GroupMessageUpdateManyAndReturnArgs} args - Arguments to update many GroupMessages.
     * @example
     * // Update many GroupMessages
     * const groupMessage = await prisma.groupMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupMessages and only return the `id`
     * const groupMessageWithIdOnly = await prisma.groupMessage.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupMessage.
     * @param {GroupMessageUpsertArgs} args - Arguments to update or create a GroupMessage.
     * @example
     * // Update or create a GroupMessage
     * const groupMessage = await prisma.groupMessage.upsert({
     *   create: {
     *     // ... data to create a GroupMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupMessage we want to update
     *   }
     * })
     */
    upsert<T extends GroupMessageUpsertArgs>(args: SelectSubset<T, GroupMessageUpsertArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageCountArgs} args - Arguments to filter GroupMessages to count.
     * @example
     * // Count the number of GroupMessages
     * const count = await prisma.groupMessage.count({
     *   where: {
     *     // ... the filter for the GroupMessages we want to count
     *   }
     * })
    **/
    count<T extends GroupMessageCountArgs>(
      args?: Subset<T, GroupMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupMessageAggregateArgs>(args: Subset<T, GroupMessageAggregateArgs>): Prisma.PrismaPromise<GetGroupMessageAggregateType<T>>

    /**
     * Group by GroupMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageGroupByArgs} args - Group by arguments.
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
      T extends GroupMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupMessageGroupByArgs['orderBy'] }
        : { orderBy?: GroupMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupMessage model
   */
  readonly fields: GroupMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupMessage model
   */
  interface GroupMessageFieldRefs {
    readonly id: FieldRef<"GroupMessage", 'String'>
    readonly type: FieldRef<"GroupMessage", 'MessageType'>
    readonly content: FieldRef<"GroupMessage", 'String'>
    readonly groupId: FieldRef<"GroupMessage", 'String'>
    readonly senderId: FieldRef<"GroupMessage", 'String'>
    readonly createdAt: FieldRef<"GroupMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"GroupMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupMessage findUnique
   */
  export type GroupMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage findUniqueOrThrow
   */
  export type GroupMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage findFirst
   */
  export type GroupMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMessages.
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMessages.
     */
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * GroupMessage findFirstOrThrow
   */
  export type GroupMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMessages.
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMessages.
     */
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * GroupMessage findMany
   */
  export type GroupMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessages to fetch.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupMessages.
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * GroupMessage create
   */
  export type GroupMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupMessage.
     */
    data: XOR<GroupMessageCreateInput, GroupMessageUncheckedCreateInput>
  }

  /**
   * GroupMessage createMany
   */
  export type GroupMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupMessages.
     */
    data: GroupMessageCreateManyInput | GroupMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupMessage createManyAndReturn
   */
  export type GroupMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * The data used to create many GroupMessages.
     */
    data: GroupMessageCreateManyInput | GroupMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMessage update
   */
  export type GroupMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupMessage.
     */
    data: XOR<GroupMessageUpdateInput, GroupMessageUncheckedUpdateInput>
    /**
     * Choose, which GroupMessage to update.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage updateMany
   */
  export type GroupMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupMessages.
     */
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyInput>
    /**
     * Filter which GroupMessages to update
     */
    where?: GroupMessageWhereInput
    /**
     * Limit how many GroupMessages to update.
     */
    limit?: number
  }

  /**
   * GroupMessage updateManyAndReturn
   */
  export type GroupMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * The data used to update GroupMessages.
     */
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyInput>
    /**
     * Filter which GroupMessages to update
     */
    where?: GroupMessageWhereInput
    /**
     * Limit how many GroupMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMessage upsert
   */
  export type GroupMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupMessage to update in case it exists.
     */
    where: GroupMessageWhereUniqueInput
    /**
     * In case the GroupMessage found by the `where` argument doesn't exist, create a new GroupMessage with this data.
     */
    create: XOR<GroupMessageCreateInput, GroupMessageUncheckedCreateInput>
    /**
     * In case the GroupMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupMessageUpdateInput, GroupMessageUncheckedUpdateInput>
  }

  /**
   * GroupMessage delete
   */
  export type GroupMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter which GroupMessage to delete.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage deleteMany
   */
  export type GroupMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMessages to delete
     */
    where?: GroupMessageWhereInput
    /**
     * Limit how many GroupMessages to delete.
     */
    limit?: number
  }

  /**
   * GroupMessage without action
   */
  export type GroupMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
  }


  /**
   * Model PrivateMessage
   */

  export type AggregatePrivateMessage = {
    _count: PrivateMessageCountAggregateOutputType | null
    _min: PrivateMessageMinAggregateOutputType | null
    _max: PrivateMessageMaxAggregateOutputType | null
  }

  export type PrivateMessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    senderId: string | null
    receiverId: string | null
    conversationId: string | null
    type: $Enums.MessageType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrivateMessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    senderId: string | null
    receiverId: string | null
    conversationId: string | null
    type: $Enums.MessageType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrivateMessageCountAggregateOutputType = {
    id: number
    content: number
    senderId: number
    receiverId: number
    conversationId: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrivateMessageMinAggregateInputType = {
    id?: true
    content?: true
    senderId?: true
    receiverId?: true
    conversationId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrivateMessageMaxAggregateInputType = {
    id?: true
    content?: true
    senderId?: true
    receiverId?: true
    conversationId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrivateMessageCountAggregateInputType = {
    id?: true
    content?: true
    senderId?: true
    receiverId?: true
    conversationId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrivateMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrivateMessage to aggregate.
     */
    where?: PrivateMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateMessages to fetch.
     */
    orderBy?: PrivateMessageOrderByWithRelationInput | PrivateMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrivateMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PrivateMessages
    **/
    _count?: true | PrivateMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrivateMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrivateMessageMaxAggregateInputType
  }

  export type GetPrivateMessageAggregateType<T extends PrivateMessageAggregateArgs> = {
        [P in keyof T & keyof AggregatePrivateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrivateMessage[P]>
      : GetScalarType<T[P], AggregatePrivateMessage[P]>
  }




  export type PrivateMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrivateMessageWhereInput
    orderBy?: PrivateMessageOrderByWithAggregationInput | PrivateMessageOrderByWithAggregationInput[]
    by: PrivateMessageScalarFieldEnum[] | PrivateMessageScalarFieldEnum
    having?: PrivateMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrivateMessageCountAggregateInputType | true
    _min?: PrivateMessageMinAggregateInputType
    _max?: PrivateMessageMaxAggregateInputType
  }

  export type PrivateMessageGroupByOutputType = {
    id: string
    content: string
    senderId: string
    receiverId: string
    conversationId: string
    type: $Enums.MessageType
    createdAt: Date
    updatedAt: Date
    _count: PrivateMessageCountAggregateOutputType | null
    _min: PrivateMessageMinAggregateOutputType | null
    _max: PrivateMessageMaxAggregateOutputType | null
  }

  type GetPrivateMessageGroupByPayload<T extends PrivateMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrivateMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrivateMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrivateMessageGroupByOutputType[P]>
            : GetScalarType<T[P], PrivateMessageGroupByOutputType[P]>
        }
      >
    >


  export type PrivateMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    senderId?: boolean
    receiverId?: boolean
    conversationId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    Conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["privateMessage"]>

  export type PrivateMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    senderId?: boolean
    receiverId?: boolean
    conversationId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    Conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["privateMessage"]>

  export type PrivateMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    senderId?: boolean
    receiverId?: boolean
    conversationId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    Conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["privateMessage"]>

  export type PrivateMessageSelectScalar = {
    id?: boolean
    content?: boolean
    senderId?: boolean
    receiverId?: boolean
    conversationId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrivateMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "senderId" | "receiverId" | "conversationId" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["privateMessage"]>
  export type PrivateMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    Conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type PrivateMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    Conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type PrivateMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    Conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $PrivateMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PrivateMessage"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
      Conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      senderId: string
      receiverId: string
      conversationId: string
      type: $Enums.MessageType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["privateMessage"]>
    composites: {}
  }

  type PrivateMessageGetPayload<S extends boolean | null | undefined | PrivateMessageDefaultArgs> = $Result.GetResult<Prisma.$PrivateMessagePayload, S>

  type PrivateMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrivateMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrivateMessageCountAggregateInputType | true
    }

  export interface PrivateMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PrivateMessage'], meta: { name: 'PrivateMessage' } }
    /**
     * Find zero or one PrivateMessage that matches the filter.
     * @param {PrivateMessageFindUniqueArgs} args - Arguments to find a PrivateMessage
     * @example
     * // Get one PrivateMessage
     * const privateMessage = await prisma.privateMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrivateMessageFindUniqueArgs>(args: SelectSubset<T, PrivateMessageFindUniqueArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PrivateMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrivateMessageFindUniqueOrThrowArgs} args - Arguments to find a PrivateMessage
     * @example
     * // Get one PrivateMessage
     * const privateMessage = await prisma.privateMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrivateMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, PrivateMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrivateMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateMessageFindFirstArgs} args - Arguments to find a PrivateMessage
     * @example
     * // Get one PrivateMessage
     * const privateMessage = await prisma.privateMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrivateMessageFindFirstArgs>(args?: SelectSubset<T, PrivateMessageFindFirstArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrivateMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateMessageFindFirstOrThrowArgs} args - Arguments to find a PrivateMessage
     * @example
     * // Get one PrivateMessage
     * const privateMessage = await prisma.privateMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrivateMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, PrivateMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PrivateMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PrivateMessages
     * const privateMessages = await prisma.privateMessage.findMany()
     * 
     * // Get first 10 PrivateMessages
     * const privateMessages = await prisma.privateMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const privateMessageWithIdOnly = await prisma.privateMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrivateMessageFindManyArgs>(args?: SelectSubset<T, PrivateMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PrivateMessage.
     * @param {PrivateMessageCreateArgs} args - Arguments to create a PrivateMessage.
     * @example
     * // Create one PrivateMessage
     * const PrivateMessage = await prisma.privateMessage.create({
     *   data: {
     *     // ... data to create a PrivateMessage
     *   }
     * })
     * 
     */
    create<T extends PrivateMessageCreateArgs>(args: SelectSubset<T, PrivateMessageCreateArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PrivateMessages.
     * @param {PrivateMessageCreateManyArgs} args - Arguments to create many PrivateMessages.
     * @example
     * // Create many PrivateMessages
     * const privateMessage = await prisma.privateMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrivateMessageCreateManyArgs>(args?: SelectSubset<T, PrivateMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PrivateMessages and returns the data saved in the database.
     * @param {PrivateMessageCreateManyAndReturnArgs} args - Arguments to create many PrivateMessages.
     * @example
     * // Create many PrivateMessages
     * const privateMessage = await prisma.privateMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PrivateMessages and only return the `id`
     * const privateMessageWithIdOnly = await prisma.privateMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrivateMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, PrivateMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PrivateMessage.
     * @param {PrivateMessageDeleteArgs} args - Arguments to delete one PrivateMessage.
     * @example
     * // Delete one PrivateMessage
     * const PrivateMessage = await prisma.privateMessage.delete({
     *   where: {
     *     // ... filter to delete one PrivateMessage
     *   }
     * })
     * 
     */
    delete<T extends PrivateMessageDeleteArgs>(args: SelectSubset<T, PrivateMessageDeleteArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PrivateMessage.
     * @param {PrivateMessageUpdateArgs} args - Arguments to update one PrivateMessage.
     * @example
     * // Update one PrivateMessage
     * const privateMessage = await prisma.privateMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrivateMessageUpdateArgs>(args: SelectSubset<T, PrivateMessageUpdateArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PrivateMessages.
     * @param {PrivateMessageDeleteManyArgs} args - Arguments to filter PrivateMessages to delete.
     * @example
     * // Delete a few PrivateMessages
     * const { count } = await prisma.privateMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrivateMessageDeleteManyArgs>(args?: SelectSubset<T, PrivateMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrivateMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PrivateMessages
     * const privateMessage = await prisma.privateMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrivateMessageUpdateManyArgs>(args: SelectSubset<T, PrivateMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrivateMessages and returns the data updated in the database.
     * @param {PrivateMessageUpdateManyAndReturnArgs} args - Arguments to update many PrivateMessages.
     * @example
     * // Update many PrivateMessages
     * const privateMessage = await prisma.privateMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PrivateMessages and only return the `id`
     * const privateMessageWithIdOnly = await prisma.privateMessage.updateManyAndReturn({
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
    updateManyAndReturn<T extends PrivateMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, PrivateMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PrivateMessage.
     * @param {PrivateMessageUpsertArgs} args - Arguments to update or create a PrivateMessage.
     * @example
     * // Update or create a PrivateMessage
     * const privateMessage = await prisma.privateMessage.upsert({
     *   create: {
     *     // ... data to create a PrivateMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PrivateMessage we want to update
     *   }
     * })
     */
    upsert<T extends PrivateMessageUpsertArgs>(args: SelectSubset<T, PrivateMessageUpsertArgs<ExtArgs>>): Prisma__PrivateMessageClient<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PrivateMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateMessageCountArgs} args - Arguments to filter PrivateMessages to count.
     * @example
     * // Count the number of PrivateMessages
     * const count = await prisma.privateMessage.count({
     *   where: {
     *     // ... the filter for the PrivateMessages we want to count
     *   }
     * })
    **/
    count<T extends PrivateMessageCountArgs>(
      args?: Subset<T, PrivateMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrivateMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PrivateMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrivateMessageAggregateArgs>(args: Subset<T, PrivateMessageAggregateArgs>): Prisma.PrismaPromise<GetPrivateMessageAggregateType<T>>

    /**
     * Group by PrivateMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrivateMessageGroupByArgs} args - Group by arguments.
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
      T extends PrivateMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrivateMessageGroupByArgs['orderBy'] }
        : { orderBy?: PrivateMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrivateMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrivateMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PrivateMessage model
   */
  readonly fields: PrivateMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PrivateMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrivateMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PrivateMessage model
   */
  interface PrivateMessageFieldRefs {
    readonly id: FieldRef<"PrivateMessage", 'String'>
    readonly content: FieldRef<"PrivateMessage", 'String'>
    readonly senderId: FieldRef<"PrivateMessage", 'String'>
    readonly receiverId: FieldRef<"PrivateMessage", 'String'>
    readonly conversationId: FieldRef<"PrivateMessage", 'String'>
    readonly type: FieldRef<"PrivateMessage", 'MessageType'>
    readonly createdAt: FieldRef<"PrivateMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"PrivateMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PrivateMessage findUnique
   */
  export type PrivateMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * Filter, which PrivateMessage to fetch.
     */
    where: PrivateMessageWhereUniqueInput
  }

  /**
   * PrivateMessage findUniqueOrThrow
   */
  export type PrivateMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * Filter, which PrivateMessage to fetch.
     */
    where: PrivateMessageWhereUniqueInput
  }

  /**
   * PrivateMessage findFirst
   */
  export type PrivateMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * Filter, which PrivateMessage to fetch.
     */
    where?: PrivateMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateMessages to fetch.
     */
    orderBy?: PrivateMessageOrderByWithRelationInput | PrivateMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrivateMessages.
     */
    cursor?: PrivateMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrivateMessages.
     */
    distinct?: PrivateMessageScalarFieldEnum | PrivateMessageScalarFieldEnum[]
  }

  /**
   * PrivateMessage findFirstOrThrow
   */
  export type PrivateMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * Filter, which PrivateMessage to fetch.
     */
    where?: PrivateMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateMessages to fetch.
     */
    orderBy?: PrivateMessageOrderByWithRelationInput | PrivateMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrivateMessages.
     */
    cursor?: PrivateMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrivateMessages.
     */
    distinct?: PrivateMessageScalarFieldEnum | PrivateMessageScalarFieldEnum[]
  }

  /**
   * PrivateMessage findMany
   */
  export type PrivateMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * Filter, which PrivateMessages to fetch.
     */
    where?: PrivateMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrivateMessages to fetch.
     */
    orderBy?: PrivateMessageOrderByWithRelationInput | PrivateMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PrivateMessages.
     */
    cursor?: PrivateMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrivateMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrivateMessages.
     */
    skip?: number
    distinct?: PrivateMessageScalarFieldEnum | PrivateMessageScalarFieldEnum[]
  }

  /**
   * PrivateMessage create
   */
  export type PrivateMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a PrivateMessage.
     */
    data: XOR<PrivateMessageCreateInput, PrivateMessageUncheckedCreateInput>
  }

  /**
   * PrivateMessage createMany
   */
  export type PrivateMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PrivateMessages.
     */
    data: PrivateMessageCreateManyInput | PrivateMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PrivateMessage createManyAndReturn
   */
  export type PrivateMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * The data used to create many PrivateMessages.
     */
    data: PrivateMessageCreateManyInput | PrivateMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PrivateMessage update
   */
  export type PrivateMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a PrivateMessage.
     */
    data: XOR<PrivateMessageUpdateInput, PrivateMessageUncheckedUpdateInput>
    /**
     * Choose, which PrivateMessage to update.
     */
    where: PrivateMessageWhereUniqueInput
  }

  /**
   * PrivateMessage updateMany
   */
  export type PrivateMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PrivateMessages.
     */
    data: XOR<PrivateMessageUpdateManyMutationInput, PrivateMessageUncheckedUpdateManyInput>
    /**
     * Filter which PrivateMessages to update
     */
    where?: PrivateMessageWhereInput
    /**
     * Limit how many PrivateMessages to update.
     */
    limit?: number
  }

  /**
   * PrivateMessage updateManyAndReturn
   */
  export type PrivateMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * The data used to update PrivateMessages.
     */
    data: XOR<PrivateMessageUpdateManyMutationInput, PrivateMessageUncheckedUpdateManyInput>
    /**
     * Filter which PrivateMessages to update
     */
    where?: PrivateMessageWhereInput
    /**
     * Limit how many PrivateMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PrivateMessage upsert
   */
  export type PrivateMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the PrivateMessage to update in case it exists.
     */
    where: PrivateMessageWhereUniqueInput
    /**
     * In case the PrivateMessage found by the `where` argument doesn't exist, create a new PrivateMessage with this data.
     */
    create: XOR<PrivateMessageCreateInput, PrivateMessageUncheckedCreateInput>
    /**
     * In case the PrivateMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrivateMessageUpdateInput, PrivateMessageUncheckedUpdateInput>
  }

  /**
   * PrivateMessage delete
   */
  export type PrivateMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    /**
     * Filter which PrivateMessage to delete.
     */
    where: PrivateMessageWhereUniqueInput
  }

  /**
   * PrivateMessage deleteMany
   */
  export type PrivateMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrivateMessages to delete
     */
    where?: PrivateMessageWhereInput
    /**
     * Limit how many PrivateMessages to delete.
     */
    limit?: number
  }

  /**
   * PrivateMessage without action
   */
  export type PrivateMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    members?: boolean | Conversation$membersArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    members?: boolean | Conversation$membersArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      messages: Prisma.$PrivateMessagePayload<ExtArgs>[]
      members: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
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
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrivateMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Conversation$membersArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrivateMessage
     */
    select?: PrivateMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrivateMessage
     */
    omit?: PrivateMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrivateMessageInclude<ExtArgs> | null
    where?: PrivateMessageWhereInput
    orderBy?: PrivateMessageOrderByWithRelationInput | PrivateMessageOrderByWithRelationInput[]
    cursor?: PrivateMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrivateMessageScalarFieldEnum | PrivateMessageScalarFieldEnum[]
  }

  /**
   * Conversation.members
   */
  export type Conversation$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    imageUrl: 'imageUrl'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const NewFriendRequestScalarFieldEnum: {
    id: 'id',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    state: 'state'
  };

  export type NewFriendRequestScalarFieldEnum = (typeof NewFriendRequestScalarFieldEnum)[keyof typeof NewFriendRequestScalarFieldEnum]


  export const GroupMessageScalarFieldEnum: {
    id: 'id',
    type: 'type',
    content: 'content',
    groupId: 'groupId',
    senderId: 'senderId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupMessageScalarFieldEnum = (typeof GroupMessageScalarFieldEnum)[keyof typeof GroupMessageScalarFieldEnum]


  export const PrivateMessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    senderId: 'senderId',
    receiverId: 'receiverId',
    conversationId: 'conversationId',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrivateMessageScalarFieldEnum = (typeof PrivateMessageScalarFieldEnum)[keyof typeof PrivateMessageScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'RequestState'
   */
  export type EnumRequestStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestState'>
    


  /**
   * Reference to a field of type 'RequestState[]'
   */
  export type ListEnumRequestStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestState[]'>
    


  /**
   * Reference to a field of type 'MessageType'
   */
  export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType'>
    


  /**
   * Reference to a field of type 'MessageType[]'
   */
  export type ListEnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    userId?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    imageUrl?: StringFilter<"User"> | string
    groupMessage?: GroupMessageListRelationFilter
    groups?: GroupListRelationFilter
    sentPrivateMessage?: PrivateMessageListRelationFilter
    receivedPrivateMessage?: PrivateMessageListRelationFilter
    conversations?: ConversationListRelationFilter
    NewFriendSendRequest?: NewFriendRequestListRelationFilter
    NewFriendReceiveRequest?: NewFriendRequestListRelationFilter
    friends?: UserListRelationFilter
    friendOf?: UserListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    imageUrl?: SortOrder
    groupMessage?: GroupMessageOrderByRelationAggregateInput
    groups?: GroupOrderByRelationAggregateInput
    sentPrivateMessage?: PrivateMessageOrderByRelationAggregateInput
    receivedPrivateMessage?: PrivateMessageOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
    NewFriendSendRequest?: NewFriendRequestOrderByRelationAggregateInput
    NewFriendReceiveRequest?: NewFriendRequestOrderByRelationAggregateInput
    friends?: UserOrderByRelationAggregateInput
    friendOf?: UserOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    imageUrl?: StringFilter<"User"> | string
    groupMessage?: GroupMessageListRelationFilter
    groups?: GroupListRelationFilter
    sentPrivateMessage?: PrivateMessageListRelationFilter
    receivedPrivateMessage?: PrivateMessageListRelationFilter
    conversations?: ConversationListRelationFilter
    NewFriendSendRequest?: NewFriendRequestListRelationFilter
    NewFriendReceiveRequest?: NewFriendRequestListRelationFilter
    friends?: UserListRelationFilter
    friendOf?: UserListRelationFilter
  }, "id" | "userId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    imageUrl?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    userId?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    imageUrl?: StringWithAggregatesFilter<"User"> | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    groupMessages?: GroupMessageListRelationFilter
    members?: UserListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupMessages?: GroupMessageOrderByRelationAggregateInput
    members?: UserOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    groupMessages?: GroupMessageListRelationFilter
    members?: UserListRelationFilter
  }, "id">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type NewFriendRequestWhereInput = {
    AND?: NewFriendRequestWhereInput | NewFriendRequestWhereInput[]
    OR?: NewFriendRequestWhereInput[]
    NOT?: NewFriendRequestWhereInput | NewFriendRequestWhereInput[]
    id?: StringFilter<"NewFriendRequest"> | string
    fromUserId?: StringFilter<"NewFriendRequest"> | string
    toUserId?: StringFilter<"NewFriendRequest"> | string
    createdAt?: DateTimeFilter<"NewFriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"NewFriendRequest"> | Date | string
    state?: EnumRequestStateFilter<"NewFriendRequest"> | $Enums.RequestState
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NewFriendRequestOrderByWithRelationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    state?: SortOrder
    from?: UserOrderByWithRelationInput
    to?: UserOrderByWithRelationInput
  }

  export type NewFriendRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewFriendRequestWhereInput | NewFriendRequestWhereInput[]
    OR?: NewFriendRequestWhereInput[]
    NOT?: NewFriendRequestWhereInput | NewFriendRequestWhereInput[]
    fromUserId?: StringFilter<"NewFriendRequest"> | string
    toUserId?: StringFilter<"NewFriendRequest"> | string
    createdAt?: DateTimeFilter<"NewFriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"NewFriendRequest"> | Date | string
    state?: EnumRequestStateFilter<"NewFriendRequest"> | $Enums.RequestState
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NewFriendRequestOrderByWithAggregationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    state?: SortOrder
    _count?: NewFriendRequestCountOrderByAggregateInput
    _max?: NewFriendRequestMaxOrderByAggregateInput
    _min?: NewFriendRequestMinOrderByAggregateInput
  }

  export type NewFriendRequestScalarWhereWithAggregatesInput = {
    AND?: NewFriendRequestScalarWhereWithAggregatesInput | NewFriendRequestScalarWhereWithAggregatesInput[]
    OR?: NewFriendRequestScalarWhereWithAggregatesInput[]
    NOT?: NewFriendRequestScalarWhereWithAggregatesInput | NewFriendRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewFriendRequest"> | string
    fromUserId?: StringWithAggregatesFilter<"NewFriendRequest"> | string
    toUserId?: StringWithAggregatesFilter<"NewFriendRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"NewFriendRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewFriendRequest"> | Date | string
    state?: EnumRequestStateWithAggregatesFilter<"NewFriendRequest"> | $Enums.RequestState
  }

  export type GroupMessageWhereInput = {
    AND?: GroupMessageWhereInput | GroupMessageWhereInput[]
    OR?: GroupMessageWhereInput[]
    NOT?: GroupMessageWhereInput | GroupMessageWhereInput[]
    id?: StringFilter<"GroupMessage"> | string
    type?: EnumMessageTypeFilter<"GroupMessage"> | $Enums.MessageType
    content?: StringFilter<"GroupMessage"> | string
    groupId?: StringFilter<"GroupMessage"> | string
    senderId?: StringFilter<"GroupMessage"> | string
    createdAt?: DateTimeFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeFilter<"GroupMessage"> | Date | string
    Group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GroupMessageOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    groupId?: SortOrder
    senderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Group?: GroupOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type GroupMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupMessageWhereInput | GroupMessageWhereInput[]
    OR?: GroupMessageWhereInput[]
    NOT?: GroupMessageWhereInput | GroupMessageWhereInput[]
    type?: EnumMessageTypeFilter<"GroupMessage"> | $Enums.MessageType
    content?: StringFilter<"GroupMessage"> | string
    groupId?: StringFilter<"GroupMessage"> | string
    senderId?: StringFilter<"GroupMessage"> | string
    createdAt?: DateTimeFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeFilter<"GroupMessage"> | Date | string
    Group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type GroupMessageOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    groupId?: SortOrder
    senderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupMessageCountOrderByAggregateInput
    _max?: GroupMessageMaxOrderByAggregateInput
    _min?: GroupMessageMinOrderByAggregateInput
  }

  export type GroupMessageScalarWhereWithAggregatesInput = {
    AND?: GroupMessageScalarWhereWithAggregatesInput | GroupMessageScalarWhereWithAggregatesInput[]
    OR?: GroupMessageScalarWhereWithAggregatesInput[]
    NOT?: GroupMessageScalarWhereWithAggregatesInput | GroupMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupMessage"> | string
    type?: EnumMessageTypeWithAggregatesFilter<"GroupMessage"> | $Enums.MessageType
    content?: StringWithAggregatesFilter<"GroupMessage"> | string
    groupId?: StringWithAggregatesFilter<"GroupMessage"> | string
    senderId?: StringWithAggregatesFilter<"GroupMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GroupMessage"> | Date | string
  }

  export type PrivateMessageWhereInput = {
    AND?: PrivateMessageWhereInput | PrivateMessageWhereInput[]
    OR?: PrivateMessageWhereInput[]
    NOT?: PrivateMessageWhereInput | PrivateMessageWhereInput[]
    id?: StringFilter<"PrivateMessage"> | string
    content?: StringFilter<"PrivateMessage"> | string
    senderId?: StringFilter<"PrivateMessage"> | string
    receiverId?: StringFilter<"PrivateMessage"> | string
    conversationId?: StringFilter<"PrivateMessage"> | string
    type?: EnumMessageTypeFilter<"PrivateMessage"> | $Enums.MessageType
    createdAt?: DateTimeFilter<"PrivateMessage"> | Date | string
    updatedAt?: DateTimeFilter<"PrivateMessage"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    Conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type PrivateMessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    conversationId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
    Conversation?: ConversationOrderByWithRelationInput
  }

  export type PrivateMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PrivateMessageWhereInput | PrivateMessageWhereInput[]
    OR?: PrivateMessageWhereInput[]
    NOT?: PrivateMessageWhereInput | PrivateMessageWhereInput[]
    content?: StringFilter<"PrivateMessage"> | string
    senderId?: StringFilter<"PrivateMessage"> | string
    receiverId?: StringFilter<"PrivateMessage"> | string
    conversationId?: StringFilter<"PrivateMessage"> | string
    type?: EnumMessageTypeFilter<"PrivateMessage"> | $Enums.MessageType
    createdAt?: DateTimeFilter<"PrivateMessage"> | Date | string
    updatedAt?: DateTimeFilter<"PrivateMessage"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    Conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id">

  export type PrivateMessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    conversationId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrivateMessageCountOrderByAggregateInput
    _max?: PrivateMessageMaxOrderByAggregateInput
    _min?: PrivateMessageMinOrderByAggregateInput
  }

  export type PrivateMessageScalarWhereWithAggregatesInput = {
    AND?: PrivateMessageScalarWhereWithAggregatesInput | PrivateMessageScalarWhereWithAggregatesInput[]
    OR?: PrivateMessageScalarWhereWithAggregatesInput[]
    NOT?: PrivateMessageScalarWhereWithAggregatesInput | PrivateMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PrivateMessage"> | string
    content?: StringWithAggregatesFilter<"PrivateMessage"> | string
    senderId?: StringWithAggregatesFilter<"PrivateMessage"> | string
    receiverId?: StringWithAggregatesFilter<"PrivateMessage"> | string
    conversationId?: StringWithAggregatesFilter<"PrivateMessage"> | string
    type?: EnumMessageTypeWithAggregatesFilter<"PrivateMessage"> | $Enums.MessageType
    createdAt?: DateTimeWithAggregatesFilter<"PrivateMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PrivateMessage"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: PrivateMessageListRelationFilter
    members?: UserListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: PrivateMessageOrderByRelationAggregateInput
    members?: UserOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: PrivateMessageListRelationFilter
    members?: UserListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type GroupCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupMessages?: GroupMessageCreateNestedManyWithoutGroupInput
    members?: UserCreateNestedManyWithoutGroupsInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutGroupInput
    members?: UserUncheckedCreateNestedManyWithoutGroupsInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupMessages?: GroupMessageUpdateManyWithoutGroupNestedInput
    members?: UserUpdateManyWithoutGroupsNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutGroupNestedInput
    members?: UserUncheckedUpdateManyWithoutGroupsNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewFriendRequestCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
    from: UserCreateNestedOneWithoutNewFriendSendRequestInput
    to: UserCreateNestedOneWithoutNewFriendReceiveRequestInput
  }

  export type NewFriendRequestUncheckedCreateInput = {
    id?: string
    fromUserId: string
    toUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
  }

  export type NewFriendRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
    from?: UserUpdateOneRequiredWithoutNewFriendSendRequestNestedInput
    to?: UserUpdateOneRequiredWithoutNewFriendReceiveRequestNestedInput
  }

  export type NewFriendRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
  }

  export type NewFriendRequestCreateManyInput = {
    id?: string
    fromUserId: string
    toUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
  }

  export type NewFriendRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
  }

  export type NewFriendRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
  }

  export type GroupMessageCreateInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Group: GroupCreateNestedOneWithoutGroupMessagesInput
    sender: UserCreateNestedOneWithoutGroupMessageInput
  }

  export type GroupMessageUncheckedCreateInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    groupId: string
    senderId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Group?: GroupUpdateOneRequiredWithoutGroupMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutGroupMessageNestedInput
  }

  export type GroupMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageCreateManyInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    groupId: string
    senderId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageCreateInput = {
    id?: string
    content: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentPrivateMessageInput
    receiver: UserCreateNestedOneWithoutReceivedPrivateMessageInput
    Conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type PrivateMessageUncheckedCreateInput = {
    id?: string
    content: string
    senderId: string
    receiverId: string
    conversationId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentPrivateMessageNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedPrivateMessageNestedInput
    Conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type PrivateMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageCreateManyInput = {
    id?: string
    content: string
    senderId: string
    receiverId: string
    conversationId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: PrivateMessageCreateNestedManyWithoutConversationInput
    members?: UserCreateNestedManyWithoutConversationsInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: PrivateMessageUncheckedCreateNestedManyWithoutConversationInput
    members?: UserUncheckedCreateNestedManyWithoutConversationsInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: PrivateMessageUpdateManyWithoutConversationNestedInput
    members?: UserUpdateManyWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: PrivateMessageUncheckedUpdateManyWithoutConversationNestedInput
    members?: UserUncheckedUpdateManyWithoutConversationsNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type GroupMessageListRelationFilter = {
    every?: GroupMessageWhereInput
    some?: GroupMessageWhereInput
    none?: GroupMessageWhereInput
  }

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type PrivateMessageListRelationFilter = {
    every?: PrivateMessageWhereInput
    some?: PrivateMessageWhereInput
    none?: PrivateMessageWhereInput
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type NewFriendRequestListRelationFilter = {
    every?: NewFriendRequestWhereInput
    some?: NewFriendRequestWhereInput
    none?: NewFriendRequestWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type GroupMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PrivateMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NewFriendRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    imageUrl?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    imageUrl?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    imageUrl?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRequestStateFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestState | EnumRequestStateFieldRefInput<$PrismaModel>
    in?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStateFilter<$PrismaModel> | $Enums.RequestState
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NewFriendRequestCountOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    state?: SortOrder
  }

  export type NewFriendRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    state?: SortOrder
  }

  export type NewFriendRequestMinOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    state?: SortOrder
  }

  export type EnumRequestStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestState | EnumRequestStateFieldRefInput<$PrismaModel>
    in?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStateWithAggregatesFilter<$PrismaModel> | $Enums.RequestState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStateFilter<$PrismaModel>
    _max?: NestedEnumRequestStateFilter<$PrismaModel>
  }

  export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type GroupMessageCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    groupId?: SortOrder
    senderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    groupId?: SortOrder
    senderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMessageMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    groupId?: SortOrder
    senderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type PrivateMessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    conversationId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrivateMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    conversationId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrivateMessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    conversationId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<GroupMessageCreateWithoutSenderInput, GroupMessageUncheckedCreateWithoutSenderInput> | GroupMessageCreateWithoutSenderInput[] | GroupMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutSenderInput | GroupMessageCreateOrConnectWithoutSenderInput[]
    createMany?: GroupMessageCreateManySenderInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type GroupCreateNestedManyWithoutMembersInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput> | GroupCreateWithoutMembersInput[] | GroupUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput | GroupCreateOrConnectWithoutMembersInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type PrivateMessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<PrivateMessageCreateWithoutSenderInput, PrivateMessageUncheckedCreateWithoutSenderInput> | PrivateMessageCreateWithoutSenderInput[] | PrivateMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutSenderInput | PrivateMessageCreateOrConnectWithoutSenderInput[]
    createMany?: PrivateMessageCreateManySenderInputEnvelope
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
  }

  export type PrivateMessageCreateNestedManyWithoutReceiverInput = {
    create?: XOR<PrivateMessageCreateWithoutReceiverInput, PrivateMessageUncheckedCreateWithoutReceiverInput> | PrivateMessageCreateWithoutReceiverInput[] | PrivateMessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutReceiverInput | PrivateMessageCreateOrConnectWithoutReceiverInput[]
    createMany?: PrivateMessageCreateManyReceiverInputEnvelope
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutMembersInput = {
    create?: XOR<ConversationCreateWithoutMembersInput, ConversationUncheckedCreateWithoutMembersInput> | ConversationCreateWithoutMembersInput[] | ConversationUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMembersInput | ConversationCreateOrConnectWithoutMembersInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type NewFriendRequestCreateNestedManyWithoutFromInput = {
    create?: XOR<NewFriendRequestCreateWithoutFromInput, NewFriendRequestUncheckedCreateWithoutFromInput> | NewFriendRequestCreateWithoutFromInput[] | NewFriendRequestUncheckedCreateWithoutFromInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutFromInput | NewFriendRequestCreateOrConnectWithoutFromInput[]
    createMany?: NewFriendRequestCreateManyFromInputEnvelope
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
  }

  export type NewFriendRequestCreateNestedManyWithoutToInput = {
    create?: XOR<NewFriendRequestCreateWithoutToInput, NewFriendRequestUncheckedCreateWithoutToInput> | NewFriendRequestCreateWithoutToInput[] | NewFriendRequestUncheckedCreateWithoutToInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutToInput | NewFriendRequestCreateOrConnectWithoutToInput[]
    createMany?: NewFriendRequestCreateManyToInputEnvelope
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutFriendOfInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type GroupMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<GroupMessageCreateWithoutSenderInput, GroupMessageUncheckedCreateWithoutSenderInput> | GroupMessageCreateWithoutSenderInput[] | GroupMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutSenderInput | GroupMessageCreateOrConnectWithoutSenderInput[]
    createMany?: GroupMessageCreateManySenderInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type GroupUncheckedCreateNestedManyWithoutMembersInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput> | GroupCreateWithoutMembersInput[] | GroupUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput | GroupCreateOrConnectWithoutMembersInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type PrivateMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<PrivateMessageCreateWithoutSenderInput, PrivateMessageUncheckedCreateWithoutSenderInput> | PrivateMessageCreateWithoutSenderInput[] | PrivateMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutSenderInput | PrivateMessageCreateOrConnectWithoutSenderInput[]
    createMany?: PrivateMessageCreateManySenderInputEnvelope
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
  }

  export type PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<PrivateMessageCreateWithoutReceiverInput, PrivateMessageUncheckedCreateWithoutReceiverInput> | PrivateMessageCreateWithoutReceiverInput[] | PrivateMessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutReceiverInput | PrivateMessageCreateOrConnectWithoutReceiverInput[]
    createMany?: PrivateMessageCreateManyReceiverInputEnvelope
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutMembersInput = {
    create?: XOR<ConversationCreateWithoutMembersInput, ConversationUncheckedCreateWithoutMembersInput> | ConversationCreateWithoutMembersInput[] | ConversationUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMembersInput | ConversationCreateOrConnectWithoutMembersInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type NewFriendRequestUncheckedCreateNestedManyWithoutFromInput = {
    create?: XOR<NewFriendRequestCreateWithoutFromInput, NewFriendRequestUncheckedCreateWithoutFromInput> | NewFriendRequestCreateWithoutFromInput[] | NewFriendRequestUncheckedCreateWithoutFromInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutFromInput | NewFriendRequestCreateOrConnectWithoutFromInput[]
    createMany?: NewFriendRequestCreateManyFromInputEnvelope
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
  }

  export type NewFriendRequestUncheckedCreateNestedManyWithoutToInput = {
    create?: XOR<NewFriendRequestCreateWithoutToInput, NewFriendRequestUncheckedCreateWithoutToInput> | NewFriendRequestCreateWithoutToInput[] | NewFriendRequestUncheckedCreateWithoutToInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutToInput | NewFriendRequestCreateOrConnectWithoutToInput[]
    createMany?: NewFriendRequestCreateManyToInputEnvelope
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFriendOfInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type GroupMessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<GroupMessageCreateWithoutSenderInput, GroupMessageUncheckedCreateWithoutSenderInput> | GroupMessageCreateWithoutSenderInput[] | GroupMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutSenderInput | GroupMessageCreateOrConnectWithoutSenderInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutSenderInput | GroupMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: GroupMessageCreateManySenderInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutSenderInput | GroupMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutSenderInput | GroupMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type GroupUpdateManyWithoutMembersNestedInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput> | GroupCreateWithoutMembersInput[] | GroupUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput | GroupCreateOrConnectWithoutMembersInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutMembersInput | GroupUpsertWithWhereUniqueWithoutMembersInput[]
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutMembersInput | GroupUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutMembersInput | GroupUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type PrivateMessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<PrivateMessageCreateWithoutSenderInput, PrivateMessageUncheckedCreateWithoutSenderInput> | PrivateMessageCreateWithoutSenderInput[] | PrivateMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutSenderInput | PrivateMessageCreateOrConnectWithoutSenderInput[]
    upsert?: PrivateMessageUpsertWithWhereUniqueWithoutSenderInput | PrivateMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: PrivateMessageCreateManySenderInputEnvelope
    set?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    disconnect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    delete?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    update?: PrivateMessageUpdateWithWhereUniqueWithoutSenderInput | PrivateMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: PrivateMessageUpdateManyWithWhereWithoutSenderInput | PrivateMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
  }

  export type PrivateMessageUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<PrivateMessageCreateWithoutReceiverInput, PrivateMessageUncheckedCreateWithoutReceiverInput> | PrivateMessageCreateWithoutReceiverInput[] | PrivateMessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutReceiverInput | PrivateMessageCreateOrConnectWithoutReceiverInput[]
    upsert?: PrivateMessageUpsertWithWhereUniqueWithoutReceiverInput | PrivateMessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: PrivateMessageCreateManyReceiverInputEnvelope
    set?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    disconnect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    delete?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    update?: PrivateMessageUpdateWithWhereUniqueWithoutReceiverInput | PrivateMessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: PrivateMessageUpdateManyWithWhereWithoutReceiverInput | PrivateMessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutMembersNestedInput = {
    create?: XOR<ConversationCreateWithoutMembersInput, ConversationUncheckedCreateWithoutMembersInput> | ConversationCreateWithoutMembersInput[] | ConversationUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMembersInput | ConversationCreateOrConnectWithoutMembersInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutMembersInput | ConversationUpsertWithWhereUniqueWithoutMembersInput[]
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutMembersInput | ConversationUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutMembersInput | ConversationUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type NewFriendRequestUpdateManyWithoutFromNestedInput = {
    create?: XOR<NewFriendRequestCreateWithoutFromInput, NewFriendRequestUncheckedCreateWithoutFromInput> | NewFriendRequestCreateWithoutFromInput[] | NewFriendRequestUncheckedCreateWithoutFromInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutFromInput | NewFriendRequestCreateOrConnectWithoutFromInput[]
    upsert?: NewFriendRequestUpsertWithWhereUniqueWithoutFromInput | NewFriendRequestUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: NewFriendRequestCreateManyFromInputEnvelope
    set?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    disconnect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    delete?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    update?: NewFriendRequestUpdateWithWhereUniqueWithoutFromInput | NewFriendRequestUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: NewFriendRequestUpdateManyWithWhereWithoutFromInput | NewFriendRequestUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: NewFriendRequestScalarWhereInput | NewFriendRequestScalarWhereInput[]
  }

  export type NewFriendRequestUpdateManyWithoutToNestedInput = {
    create?: XOR<NewFriendRequestCreateWithoutToInput, NewFriendRequestUncheckedCreateWithoutToInput> | NewFriendRequestCreateWithoutToInput[] | NewFriendRequestUncheckedCreateWithoutToInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutToInput | NewFriendRequestCreateOrConnectWithoutToInput[]
    upsert?: NewFriendRequestUpsertWithWhereUniqueWithoutToInput | NewFriendRequestUpsertWithWhereUniqueWithoutToInput[]
    createMany?: NewFriendRequestCreateManyToInputEnvelope
    set?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    disconnect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    delete?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    update?: NewFriendRequestUpdateWithWhereUniqueWithoutToInput | NewFriendRequestUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: NewFriendRequestUpdateManyWithWhereWithoutToInput | NewFriendRequestUpdateManyWithWhereWithoutToInput[]
    deleteMany?: NewFriendRequestScalarWhereInput | NewFriendRequestScalarWhereInput[]
  }

  export type UserUpdateManyWithoutFriendOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendOfInput | UserUpsertWithWhereUniqueWithoutFriendOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendOfInput | UserUpdateWithWhereUniqueWithoutFriendOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendOfInput | UserUpdateManyWithWhereWithoutFriendOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type GroupMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<GroupMessageCreateWithoutSenderInput, GroupMessageUncheckedCreateWithoutSenderInput> | GroupMessageCreateWithoutSenderInput[] | GroupMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutSenderInput | GroupMessageCreateOrConnectWithoutSenderInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutSenderInput | GroupMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: GroupMessageCreateManySenderInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutSenderInput | GroupMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutSenderInput | GroupMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type GroupUncheckedUpdateManyWithoutMembersNestedInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput> | GroupCreateWithoutMembersInput[] | GroupUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput | GroupCreateOrConnectWithoutMembersInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutMembersInput | GroupUpsertWithWhereUniqueWithoutMembersInput[]
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutMembersInput | GroupUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutMembersInput | GroupUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<PrivateMessageCreateWithoutSenderInput, PrivateMessageUncheckedCreateWithoutSenderInput> | PrivateMessageCreateWithoutSenderInput[] | PrivateMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutSenderInput | PrivateMessageCreateOrConnectWithoutSenderInput[]
    upsert?: PrivateMessageUpsertWithWhereUniqueWithoutSenderInput | PrivateMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: PrivateMessageCreateManySenderInputEnvelope
    set?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    disconnect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    delete?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    update?: PrivateMessageUpdateWithWhereUniqueWithoutSenderInput | PrivateMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: PrivateMessageUpdateManyWithWhereWithoutSenderInput | PrivateMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
  }

  export type PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<PrivateMessageCreateWithoutReceiverInput, PrivateMessageUncheckedCreateWithoutReceiverInput> | PrivateMessageCreateWithoutReceiverInput[] | PrivateMessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutReceiverInput | PrivateMessageCreateOrConnectWithoutReceiverInput[]
    upsert?: PrivateMessageUpsertWithWhereUniqueWithoutReceiverInput | PrivateMessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: PrivateMessageCreateManyReceiverInputEnvelope
    set?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    disconnect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    delete?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    update?: PrivateMessageUpdateWithWhereUniqueWithoutReceiverInput | PrivateMessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: PrivateMessageUpdateManyWithWhereWithoutReceiverInput | PrivateMessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutMembersNestedInput = {
    create?: XOR<ConversationCreateWithoutMembersInput, ConversationUncheckedCreateWithoutMembersInput> | ConversationCreateWithoutMembersInput[] | ConversationUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMembersInput | ConversationCreateOrConnectWithoutMembersInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutMembersInput | ConversationUpsertWithWhereUniqueWithoutMembersInput[]
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutMembersInput | ConversationUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutMembersInput | ConversationUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput = {
    create?: XOR<NewFriendRequestCreateWithoutFromInput, NewFriendRequestUncheckedCreateWithoutFromInput> | NewFriendRequestCreateWithoutFromInput[] | NewFriendRequestUncheckedCreateWithoutFromInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutFromInput | NewFriendRequestCreateOrConnectWithoutFromInput[]
    upsert?: NewFriendRequestUpsertWithWhereUniqueWithoutFromInput | NewFriendRequestUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: NewFriendRequestCreateManyFromInputEnvelope
    set?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    disconnect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    delete?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    update?: NewFriendRequestUpdateWithWhereUniqueWithoutFromInput | NewFriendRequestUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: NewFriendRequestUpdateManyWithWhereWithoutFromInput | NewFriendRequestUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: NewFriendRequestScalarWhereInput | NewFriendRequestScalarWhereInput[]
  }

  export type NewFriendRequestUncheckedUpdateManyWithoutToNestedInput = {
    create?: XOR<NewFriendRequestCreateWithoutToInput, NewFriendRequestUncheckedCreateWithoutToInput> | NewFriendRequestCreateWithoutToInput[] | NewFriendRequestUncheckedCreateWithoutToInput[]
    connectOrCreate?: NewFriendRequestCreateOrConnectWithoutToInput | NewFriendRequestCreateOrConnectWithoutToInput[]
    upsert?: NewFriendRequestUpsertWithWhereUniqueWithoutToInput | NewFriendRequestUpsertWithWhereUniqueWithoutToInput[]
    createMany?: NewFriendRequestCreateManyToInputEnvelope
    set?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    disconnect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    delete?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    connect?: NewFriendRequestWhereUniqueInput | NewFriendRequestWhereUniqueInput[]
    update?: NewFriendRequestUpdateWithWhereUniqueWithoutToInput | NewFriendRequestUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: NewFriendRequestUpdateManyWithWhereWithoutToInput | NewFriendRequestUpdateManyWithWhereWithoutToInput[]
    deleteMany?: NewFriendRequestScalarWhereInput | NewFriendRequestScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFriendOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput> | UserCreateWithoutFriendOfInput[] | UserUncheckedCreateWithoutFriendOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput | UserCreateOrConnectWithoutFriendOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendOfInput | UserUpsertWithWhereUniqueWithoutFriendOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendOfInput | UserUpdateWithWhereUniqueWithoutFriendOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendOfInput | UserUpdateManyWithWhereWithoutFriendOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type GroupMessageCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupMessageCreateWithoutGroupInput, GroupMessageUncheckedCreateWithoutGroupInput> | GroupMessageCreateWithoutGroupInput[] | GroupMessageUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupInput | GroupMessageCreateOrConnectWithoutGroupInput[]
    createMany?: GroupMessageCreateManyGroupInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutGroupsInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput> | UserCreateWithoutGroupsInput[] | UserUncheckedCreateWithoutGroupsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput | UserCreateOrConnectWithoutGroupsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type GroupMessageUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupMessageCreateWithoutGroupInput, GroupMessageUncheckedCreateWithoutGroupInput> | GroupMessageCreateWithoutGroupInput[] | GroupMessageUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupInput | GroupMessageCreateOrConnectWithoutGroupInput[]
    createMany?: GroupMessageCreateManyGroupInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutGroupsInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput> | UserCreateWithoutGroupsInput[] | UserUncheckedCreateWithoutGroupsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput | UserCreateOrConnectWithoutGroupsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GroupMessageUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupMessageCreateWithoutGroupInput, GroupMessageUncheckedCreateWithoutGroupInput> | GroupMessageCreateWithoutGroupInput[] | GroupMessageUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupInput | GroupMessageCreateOrConnectWithoutGroupInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutGroupInput | GroupMessageUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupMessageCreateManyGroupInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutGroupInput | GroupMessageUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutGroupInput | GroupMessageUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type UserUpdateManyWithoutGroupsNestedInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput> | UserCreateWithoutGroupsInput[] | UserUncheckedCreateWithoutGroupsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput | UserCreateOrConnectWithoutGroupsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupsInput | UserUpsertWithWhereUniqueWithoutGroupsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupsInput | UserUpdateWithWhereUniqueWithoutGroupsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupsInput | UserUpdateManyWithWhereWithoutGroupsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type GroupMessageUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupMessageCreateWithoutGroupInput, GroupMessageUncheckedCreateWithoutGroupInput> | GroupMessageCreateWithoutGroupInput[] | GroupMessageUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupInput | GroupMessageCreateOrConnectWithoutGroupInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutGroupInput | GroupMessageUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupMessageCreateManyGroupInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutGroupInput | GroupMessageUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutGroupInput | GroupMessageUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutGroupsNestedInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput> | UserCreateWithoutGroupsInput[] | UserUncheckedCreateWithoutGroupsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput | UserCreateOrConnectWithoutGroupsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupsInput | UserUpsertWithWhereUniqueWithoutGroupsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupsInput | UserUpdateWithWhereUniqueWithoutGroupsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupsInput | UserUpdateManyWithWhereWithoutGroupsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNewFriendSendRequestInput = {
    create?: XOR<UserCreateWithoutNewFriendSendRequestInput, UserUncheckedCreateWithoutNewFriendSendRequestInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewFriendSendRequestInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNewFriendReceiveRequestInput = {
    create?: XOR<UserCreateWithoutNewFriendReceiveRequestInput, UserUncheckedCreateWithoutNewFriendReceiveRequestInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewFriendReceiveRequestInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRequestStateFieldUpdateOperationsInput = {
    set?: $Enums.RequestState
  }

  export type UserUpdateOneRequiredWithoutNewFriendSendRequestNestedInput = {
    create?: XOR<UserCreateWithoutNewFriendSendRequestInput, UserUncheckedCreateWithoutNewFriendSendRequestInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewFriendSendRequestInput
    upsert?: UserUpsertWithoutNewFriendSendRequestInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNewFriendSendRequestInput, UserUpdateWithoutNewFriendSendRequestInput>, UserUncheckedUpdateWithoutNewFriendSendRequestInput>
  }

  export type UserUpdateOneRequiredWithoutNewFriendReceiveRequestNestedInput = {
    create?: XOR<UserCreateWithoutNewFriendReceiveRequestInput, UserUncheckedCreateWithoutNewFriendReceiveRequestInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewFriendReceiveRequestInput
    upsert?: UserUpsertWithoutNewFriendReceiveRequestInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNewFriendReceiveRequestInput, UserUpdateWithoutNewFriendReceiveRequestInput>, UserUncheckedUpdateWithoutNewFriendReceiveRequestInput>
  }

  export type GroupCreateNestedOneWithoutGroupMessagesInput = {
    create?: XOR<GroupCreateWithoutGroupMessagesInput, GroupUncheckedCreateWithoutGroupMessagesInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupMessagesInput
    connect?: GroupWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGroupMessageInput = {
    create?: XOR<UserCreateWithoutGroupMessageInput, UserUncheckedCreateWithoutGroupMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMessageInput
    connect?: UserWhereUniqueInput
  }

  export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType
  }

  export type GroupUpdateOneRequiredWithoutGroupMessagesNestedInput = {
    create?: XOR<GroupCreateWithoutGroupMessagesInput, GroupUncheckedCreateWithoutGroupMessagesInput>
    connectOrCreate?: GroupCreateOrConnectWithoutGroupMessagesInput
    upsert?: GroupUpsertWithoutGroupMessagesInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutGroupMessagesInput, GroupUpdateWithoutGroupMessagesInput>, GroupUncheckedUpdateWithoutGroupMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutGroupMessageNestedInput = {
    create?: XOR<UserCreateWithoutGroupMessageInput, UserUncheckedCreateWithoutGroupMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMessageInput
    upsert?: UserUpsertWithoutGroupMessageInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupMessageInput, UserUpdateWithoutGroupMessageInput>, UserUncheckedUpdateWithoutGroupMessageInput>
  }

  export type UserCreateNestedOneWithoutSentPrivateMessageInput = {
    create?: XOR<UserCreateWithoutSentPrivateMessageInput, UserUncheckedCreateWithoutSentPrivateMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentPrivateMessageInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedPrivateMessageInput = {
    create?: XOR<UserCreateWithoutReceivedPrivateMessageInput, UserUncheckedCreateWithoutReceivedPrivateMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedPrivateMessageInput
    connect?: UserWhereUniqueInput
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSentPrivateMessageNestedInput = {
    create?: XOR<UserCreateWithoutSentPrivateMessageInput, UserUncheckedCreateWithoutSentPrivateMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentPrivateMessageInput
    upsert?: UserUpsertWithoutSentPrivateMessageInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentPrivateMessageInput, UserUpdateWithoutSentPrivateMessageInput>, UserUncheckedUpdateWithoutSentPrivateMessageInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedPrivateMessageNestedInput = {
    create?: XOR<UserCreateWithoutReceivedPrivateMessageInput, UserUncheckedCreateWithoutReceivedPrivateMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedPrivateMessageInput
    upsert?: UserUpsertWithoutReceivedPrivateMessageInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedPrivateMessageInput, UserUpdateWithoutReceivedPrivateMessageInput>, UserUncheckedUpdateWithoutReceivedPrivateMessageInput>
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type PrivateMessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<PrivateMessageCreateWithoutConversationInput, PrivateMessageUncheckedCreateWithoutConversationInput> | PrivateMessageCreateWithoutConversationInput[] | PrivateMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutConversationInput | PrivateMessageCreateOrConnectWithoutConversationInput[]
    createMany?: PrivateMessageCreateManyConversationInputEnvelope
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput> | UserCreateWithoutConversationsInput[] | UserUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput | UserCreateOrConnectWithoutConversationsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PrivateMessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<PrivateMessageCreateWithoutConversationInput, PrivateMessageUncheckedCreateWithoutConversationInput> | PrivateMessageCreateWithoutConversationInput[] | PrivateMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutConversationInput | PrivateMessageCreateOrConnectWithoutConversationInput[]
    createMany?: PrivateMessageCreateManyConversationInputEnvelope
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput> | UserCreateWithoutConversationsInput[] | UserUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput | UserCreateOrConnectWithoutConversationsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PrivateMessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<PrivateMessageCreateWithoutConversationInput, PrivateMessageUncheckedCreateWithoutConversationInput> | PrivateMessageCreateWithoutConversationInput[] | PrivateMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutConversationInput | PrivateMessageCreateOrConnectWithoutConversationInput[]
    upsert?: PrivateMessageUpsertWithWhereUniqueWithoutConversationInput | PrivateMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: PrivateMessageCreateManyConversationInputEnvelope
    set?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    disconnect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    delete?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    update?: PrivateMessageUpdateWithWhereUniqueWithoutConversationInput | PrivateMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: PrivateMessageUpdateManyWithWhereWithoutConversationInput | PrivateMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
  }

  export type UserUpdateManyWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput> | UserCreateWithoutConversationsInput[] | UserUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput | UserCreateOrConnectWithoutConversationsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutConversationsInput | UserUpsertWithWhereUniqueWithoutConversationsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutConversationsInput | UserUpdateWithWhereUniqueWithoutConversationsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutConversationsInput | UserUpdateManyWithWhereWithoutConversationsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PrivateMessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<PrivateMessageCreateWithoutConversationInput, PrivateMessageUncheckedCreateWithoutConversationInput> | PrivateMessageCreateWithoutConversationInput[] | PrivateMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: PrivateMessageCreateOrConnectWithoutConversationInput | PrivateMessageCreateOrConnectWithoutConversationInput[]
    upsert?: PrivateMessageUpsertWithWhereUniqueWithoutConversationInput | PrivateMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: PrivateMessageCreateManyConversationInputEnvelope
    set?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    disconnect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    delete?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    connect?: PrivateMessageWhereUniqueInput | PrivateMessageWhereUniqueInput[]
    update?: PrivateMessageUpdateWithWhereUniqueWithoutConversationInput | PrivateMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: PrivateMessageUpdateManyWithWhereWithoutConversationInput | PrivateMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput> | UserCreateWithoutConversationsInput[] | UserUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput | UserCreateOrConnectWithoutConversationsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutConversationsInput | UserUpsertWithWhereUniqueWithoutConversationsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutConversationsInput | UserUpdateWithWhereUniqueWithoutConversationsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutConversationsInput | UserUpdateManyWithWhereWithoutConversationsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRequestStateFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestState | EnumRequestStateFieldRefInput<$PrismaModel>
    in?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStateFilter<$PrismaModel> | $Enums.RequestState
  }

  export type NestedEnumRequestStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestState | EnumRequestStateFieldRefInput<$PrismaModel>
    in?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestState[] | ListEnumRequestStateFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStateWithAggregatesFilter<$PrismaModel> | $Enums.RequestState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStateFilter<$PrismaModel>
    _max?: NestedEnumRequestStateFilter<$PrismaModel>
  }

  export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type GroupMessageCreateWithoutSenderInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Group: GroupCreateNestedOneWithoutGroupMessagesInput
  }

  export type GroupMessageUncheckedCreateWithoutSenderInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    groupId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageCreateOrConnectWithoutSenderInput = {
    where: GroupMessageWhereUniqueInput
    create: XOR<GroupMessageCreateWithoutSenderInput, GroupMessageUncheckedCreateWithoutSenderInput>
  }

  export type GroupMessageCreateManySenderInputEnvelope = {
    data: GroupMessageCreateManySenderInput | GroupMessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type GroupCreateWithoutMembersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupMessages?: GroupMessageCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutMembersInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
  }

  export type PrivateMessageCreateWithoutSenderInput = {
    id?: string
    content: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver: UserCreateNestedOneWithoutReceivedPrivateMessageInput
    Conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type PrivateMessageUncheckedCreateWithoutSenderInput = {
    id?: string
    content: string
    receiverId: string
    conversationId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageCreateOrConnectWithoutSenderInput = {
    where: PrivateMessageWhereUniqueInput
    create: XOR<PrivateMessageCreateWithoutSenderInput, PrivateMessageUncheckedCreateWithoutSenderInput>
  }

  export type PrivateMessageCreateManySenderInputEnvelope = {
    data: PrivateMessageCreateManySenderInput | PrivateMessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type PrivateMessageCreateWithoutReceiverInput = {
    id?: string
    content: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentPrivateMessageInput
    Conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type PrivateMessageUncheckedCreateWithoutReceiverInput = {
    id?: string
    content: string
    senderId: string
    conversationId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageCreateOrConnectWithoutReceiverInput = {
    where: PrivateMessageWhereUniqueInput
    create: XOR<PrivateMessageCreateWithoutReceiverInput, PrivateMessageUncheckedCreateWithoutReceiverInput>
  }

  export type PrivateMessageCreateManyReceiverInputEnvelope = {
    data: PrivateMessageCreateManyReceiverInput | PrivateMessageCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutMembersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: PrivateMessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMembersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: PrivateMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMembersInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMembersInput, ConversationUncheckedCreateWithoutMembersInput>
  }

  export type NewFriendRequestCreateWithoutFromInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
    to: UserCreateNestedOneWithoutNewFriendReceiveRequestInput
  }

  export type NewFriendRequestUncheckedCreateWithoutFromInput = {
    id?: string
    toUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
  }

  export type NewFriendRequestCreateOrConnectWithoutFromInput = {
    where: NewFriendRequestWhereUniqueInput
    create: XOR<NewFriendRequestCreateWithoutFromInput, NewFriendRequestUncheckedCreateWithoutFromInput>
  }

  export type NewFriendRequestCreateManyFromInputEnvelope = {
    data: NewFriendRequestCreateManyFromInput | NewFriendRequestCreateManyFromInput[]
    skipDuplicates?: boolean
  }

  export type NewFriendRequestCreateWithoutToInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
    from: UserCreateNestedOneWithoutNewFriendSendRequestInput
  }

  export type NewFriendRequestUncheckedCreateWithoutToInput = {
    id?: string
    fromUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
  }

  export type NewFriendRequestCreateOrConnectWithoutToInput = {
    where: NewFriendRequestWhereUniqueInput
    create: XOR<NewFriendRequestCreateWithoutToInput, NewFriendRequestUncheckedCreateWithoutToInput>
  }

  export type NewFriendRequestCreateManyToInputEnvelope = {
    data: NewFriendRequestCreateManyToInput | NewFriendRequestCreateManyToInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutFriendOfInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
  }

  export type UserUncheckedCreateWithoutFriendOfInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
  }

  export type UserCreateOrConnectWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
  }

  export type UserCreateWithoutFriendsInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutFriendsInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutFriendsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type GroupMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: GroupMessageWhereUniqueInput
    update: XOR<GroupMessageUpdateWithoutSenderInput, GroupMessageUncheckedUpdateWithoutSenderInput>
    create: XOR<GroupMessageCreateWithoutSenderInput, GroupMessageUncheckedCreateWithoutSenderInput>
  }

  export type GroupMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: GroupMessageWhereUniqueInput
    data: XOR<GroupMessageUpdateWithoutSenderInput, GroupMessageUncheckedUpdateWithoutSenderInput>
  }

  export type GroupMessageUpdateManyWithWhereWithoutSenderInput = {
    where: GroupMessageScalarWhereInput
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type GroupMessageScalarWhereInput = {
    AND?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
    OR?: GroupMessageScalarWhereInput[]
    NOT?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
    id?: StringFilter<"GroupMessage"> | string
    type?: EnumMessageTypeFilter<"GroupMessage"> | $Enums.MessageType
    content?: StringFilter<"GroupMessage"> | string
    groupId?: StringFilter<"GroupMessage"> | string
    senderId?: StringFilter<"GroupMessage"> | string
    createdAt?: DateTimeFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeFilter<"GroupMessage"> | Date | string
  }

  export type GroupUpsertWithWhereUniqueWithoutMembersInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutMembersInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
  }

  export type GroupUpdateManyWithWhereWithoutMembersInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyWithoutMembersInput>
  }

  export type GroupScalarWhereInput = {
    AND?: GroupScalarWhereInput | GroupScalarWhereInput[]
    OR?: GroupScalarWhereInput[]
    NOT?: GroupScalarWhereInput | GroupScalarWhereInput[]
    id?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
  }

  export type PrivateMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: PrivateMessageWhereUniqueInput
    update: XOR<PrivateMessageUpdateWithoutSenderInput, PrivateMessageUncheckedUpdateWithoutSenderInput>
    create: XOR<PrivateMessageCreateWithoutSenderInput, PrivateMessageUncheckedCreateWithoutSenderInput>
  }

  export type PrivateMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: PrivateMessageWhereUniqueInput
    data: XOR<PrivateMessageUpdateWithoutSenderInput, PrivateMessageUncheckedUpdateWithoutSenderInput>
  }

  export type PrivateMessageUpdateManyWithWhereWithoutSenderInput = {
    where: PrivateMessageScalarWhereInput
    data: XOR<PrivateMessageUpdateManyMutationInput, PrivateMessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type PrivateMessageScalarWhereInput = {
    AND?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
    OR?: PrivateMessageScalarWhereInput[]
    NOT?: PrivateMessageScalarWhereInput | PrivateMessageScalarWhereInput[]
    id?: StringFilter<"PrivateMessage"> | string
    content?: StringFilter<"PrivateMessage"> | string
    senderId?: StringFilter<"PrivateMessage"> | string
    receiverId?: StringFilter<"PrivateMessage"> | string
    conversationId?: StringFilter<"PrivateMessage"> | string
    type?: EnumMessageTypeFilter<"PrivateMessage"> | $Enums.MessageType
    createdAt?: DateTimeFilter<"PrivateMessage"> | Date | string
    updatedAt?: DateTimeFilter<"PrivateMessage"> | Date | string
  }

  export type PrivateMessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: PrivateMessageWhereUniqueInput
    update: XOR<PrivateMessageUpdateWithoutReceiverInput, PrivateMessageUncheckedUpdateWithoutReceiverInput>
    create: XOR<PrivateMessageCreateWithoutReceiverInput, PrivateMessageUncheckedCreateWithoutReceiverInput>
  }

  export type PrivateMessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: PrivateMessageWhereUniqueInput
    data: XOR<PrivateMessageUpdateWithoutReceiverInput, PrivateMessageUncheckedUpdateWithoutReceiverInput>
  }

  export type PrivateMessageUpdateManyWithWhereWithoutReceiverInput = {
    where: PrivateMessageScalarWhereInput
    data: XOR<PrivateMessageUpdateManyMutationInput, PrivateMessageUncheckedUpdateManyWithoutReceiverInput>
  }

  export type ConversationUpsertWithWhereUniqueWithoutMembersInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutMembersInput, ConversationUncheckedUpdateWithoutMembersInput>
    create: XOR<ConversationCreateWithoutMembersInput, ConversationUncheckedCreateWithoutMembersInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutMembersInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutMembersInput, ConversationUncheckedUpdateWithoutMembersInput>
  }

  export type ConversationUpdateManyWithWhereWithoutMembersInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutMembersInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type NewFriendRequestUpsertWithWhereUniqueWithoutFromInput = {
    where: NewFriendRequestWhereUniqueInput
    update: XOR<NewFriendRequestUpdateWithoutFromInput, NewFriendRequestUncheckedUpdateWithoutFromInput>
    create: XOR<NewFriendRequestCreateWithoutFromInput, NewFriendRequestUncheckedCreateWithoutFromInput>
  }

  export type NewFriendRequestUpdateWithWhereUniqueWithoutFromInput = {
    where: NewFriendRequestWhereUniqueInput
    data: XOR<NewFriendRequestUpdateWithoutFromInput, NewFriendRequestUncheckedUpdateWithoutFromInput>
  }

  export type NewFriendRequestUpdateManyWithWhereWithoutFromInput = {
    where: NewFriendRequestScalarWhereInput
    data: XOR<NewFriendRequestUpdateManyMutationInput, NewFriendRequestUncheckedUpdateManyWithoutFromInput>
  }

  export type NewFriendRequestScalarWhereInput = {
    AND?: NewFriendRequestScalarWhereInput | NewFriendRequestScalarWhereInput[]
    OR?: NewFriendRequestScalarWhereInput[]
    NOT?: NewFriendRequestScalarWhereInput | NewFriendRequestScalarWhereInput[]
    id?: StringFilter<"NewFriendRequest"> | string
    fromUserId?: StringFilter<"NewFriendRequest"> | string
    toUserId?: StringFilter<"NewFriendRequest"> | string
    createdAt?: DateTimeFilter<"NewFriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"NewFriendRequest"> | Date | string
    state?: EnumRequestStateFilter<"NewFriendRequest"> | $Enums.RequestState
  }

  export type NewFriendRequestUpsertWithWhereUniqueWithoutToInput = {
    where: NewFriendRequestWhereUniqueInput
    update: XOR<NewFriendRequestUpdateWithoutToInput, NewFriendRequestUncheckedUpdateWithoutToInput>
    create: XOR<NewFriendRequestCreateWithoutToInput, NewFriendRequestUncheckedCreateWithoutToInput>
  }

  export type NewFriendRequestUpdateWithWhereUniqueWithoutToInput = {
    where: NewFriendRequestWhereUniqueInput
    data: XOR<NewFriendRequestUpdateWithoutToInput, NewFriendRequestUncheckedUpdateWithoutToInput>
  }

  export type NewFriendRequestUpdateManyWithWhereWithoutToInput = {
    where: NewFriendRequestScalarWhereInput
    data: XOR<NewFriendRequestUpdateManyMutationInput, NewFriendRequestUncheckedUpdateManyWithoutToInput>
  }

  export type UserUpsertWithWhereUniqueWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendOfInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendOfInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    userId?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    imageUrl?: StringFilter<"User"> | string
  }

  export type UserUpsertWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendsInput>
  }

  export type GroupMessageCreateWithoutGroupInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutGroupMessageInput
  }

  export type GroupMessageUncheckedCreateWithoutGroupInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    senderId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageCreateOrConnectWithoutGroupInput = {
    where: GroupMessageWhereUniqueInput
    create: XOR<GroupMessageCreateWithoutGroupInput, GroupMessageUncheckedCreateWithoutGroupInput>
  }

  export type GroupMessageCreateManyGroupInputEnvelope = {
    data: GroupMessageCreateManyGroupInput | GroupMessageCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutGroupsInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutGroupsInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
  }

  export type GroupMessageUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupMessageWhereUniqueInput
    update: XOR<GroupMessageUpdateWithoutGroupInput, GroupMessageUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupMessageCreateWithoutGroupInput, GroupMessageUncheckedCreateWithoutGroupInput>
  }

  export type GroupMessageUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupMessageWhereUniqueInput
    data: XOR<GroupMessageUpdateWithoutGroupInput, GroupMessageUncheckedUpdateWithoutGroupInput>
  }

  export type GroupMessageUpdateManyWithWhereWithoutGroupInput = {
    where: GroupMessageScalarWhereInput
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserUpsertWithWhereUniqueWithoutGroupsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutGroupsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type UserUpdateManyWithWhereWithoutGroupsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutGroupsInput>
  }

  export type UserCreateWithoutNewFriendSendRequestInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutNewFriendSendRequestInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutNewFriendSendRequestInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNewFriendSendRequestInput, UserUncheckedCreateWithoutNewFriendSendRequestInput>
  }

  export type UserCreateWithoutNewFriendReceiveRequestInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutNewFriendReceiveRequestInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutNewFriendReceiveRequestInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNewFriendReceiveRequestInput, UserUncheckedCreateWithoutNewFriendReceiveRequestInput>
  }

  export type UserUpsertWithoutNewFriendSendRequestInput = {
    update: XOR<UserUpdateWithoutNewFriendSendRequestInput, UserUncheckedUpdateWithoutNewFriendSendRequestInput>
    create: XOR<UserCreateWithoutNewFriendSendRequestInput, UserUncheckedCreateWithoutNewFriendSendRequestInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNewFriendSendRequestInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNewFriendSendRequestInput, UserUncheckedUpdateWithoutNewFriendSendRequestInput>
  }

  export type UserUpdateWithoutNewFriendSendRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutNewFriendSendRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type UserUpsertWithoutNewFriendReceiveRequestInput = {
    update: XOR<UserUpdateWithoutNewFriendReceiveRequestInput, UserUncheckedUpdateWithoutNewFriendReceiveRequestInput>
    create: XOR<UserCreateWithoutNewFriendReceiveRequestInput, UserUncheckedCreateWithoutNewFriendReceiveRequestInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNewFriendReceiveRequestInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNewFriendReceiveRequestInput, UserUncheckedUpdateWithoutNewFriendReceiveRequestInput>
  }

  export type UserUpdateWithoutNewFriendReceiveRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutNewFriendReceiveRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type GroupCreateWithoutGroupMessagesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutGroupsInput
  }

  export type GroupUncheckedCreateWithoutGroupMessagesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutGroupsInput
  }

  export type GroupCreateOrConnectWithoutGroupMessagesInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutGroupMessagesInput, GroupUncheckedCreateWithoutGroupMessagesInput>
  }

  export type UserCreateWithoutGroupMessageInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutGroupMessageInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutGroupMessageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupMessageInput, UserUncheckedCreateWithoutGroupMessageInput>
  }

  export type GroupUpsertWithoutGroupMessagesInput = {
    update: XOR<GroupUpdateWithoutGroupMessagesInput, GroupUncheckedUpdateWithoutGroupMessagesInput>
    create: XOR<GroupCreateWithoutGroupMessagesInput, GroupUncheckedCreateWithoutGroupMessagesInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutGroupMessagesInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutGroupMessagesInput, GroupUncheckedUpdateWithoutGroupMessagesInput>
  }

  export type GroupUpdateWithoutGroupMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutGroupsNestedInput
  }

  export type GroupUncheckedUpdateWithoutGroupMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutGroupsNestedInput
  }

  export type UserUpsertWithoutGroupMessageInput = {
    update: XOR<UserUpdateWithoutGroupMessageInput, UserUncheckedUpdateWithoutGroupMessageInput>
    create: XOR<UserCreateWithoutGroupMessageInput, UserUncheckedCreateWithoutGroupMessageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupMessageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupMessageInput, UserUncheckedUpdateWithoutGroupMessageInput>
  }

  export type UserUpdateWithoutGroupMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type UserCreateWithoutSentPrivateMessageInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutSentPrivateMessageInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutSentPrivateMessageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentPrivateMessageInput, UserUncheckedCreateWithoutSentPrivateMessageInput>
  }

  export type UserCreateWithoutReceivedPrivateMessageInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    conversations?: ConversationCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutReceivedPrivateMessageInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutMembersInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutReceivedPrivateMessageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedPrivateMessageInput, UserUncheckedCreateWithoutReceivedPrivateMessageInput>
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutConversationsInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutConversationsInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutSentPrivateMessageInput = {
    update: XOR<UserUpdateWithoutSentPrivateMessageInput, UserUncheckedUpdateWithoutSentPrivateMessageInput>
    create: XOR<UserCreateWithoutSentPrivateMessageInput, UserUncheckedCreateWithoutSentPrivateMessageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentPrivateMessageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentPrivateMessageInput, UserUncheckedUpdateWithoutSentPrivateMessageInput>
  }

  export type UserUpdateWithoutSentPrivateMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutSentPrivateMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type UserUpsertWithoutReceivedPrivateMessageInput = {
    update: XOR<UserUpdateWithoutReceivedPrivateMessageInput, UserUncheckedUpdateWithoutReceivedPrivateMessageInput>
    create: XOR<UserCreateWithoutReceivedPrivateMessageInput, UserUncheckedCreateWithoutReceivedPrivateMessageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedPrivateMessageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedPrivateMessageInput, UserUncheckedUpdateWithoutReceivedPrivateMessageInput>
  }

  export type UserUpdateWithoutReceivedPrivateMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedPrivateMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutConversationsNestedInput
  }

  export type PrivateMessageCreateWithoutConversationInput = {
    id?: string
    content: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentPrivateMessageInput
    receiver: UserCreateNestedOneWithoutReceivedPrivateMessageInput
  }

  export type PrivateMessageUncheckedCreateWithoutConversationInput = {
    id?: string
    content: string
    senderId: string
    receiverId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageCreateOrConnectWithoutConversationInput = {
    where: PrivateMessageWhereUniqueInput
    create: XOR<PrivateMessageCreateWithoutConversationInput, PrivateMessageUncheckedCreateWithoutConversationInput>
  }

  export type PrivateMessageCreateManyConversationInputEnvelope = {
    data: PrivateMessageCreateManyConversationInput | PrivateMessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageCreateNestedManyWithoutSenderInput
    groups?: GroupCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageCreateNestedManyWithoutReceiverInput
    NewFriendSendRequest?: NewFriendRequestCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestCreateNestedManyWithoutToInput
    friends?: UserCreateNestedManyWithoutFriendOfInput
    friendOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    userId: string
    fullName: string
    imageUrl: string
    groupMessage?: GroupMessageUncheckedCreateNestedManyWithoutSenderInput
    groups?: GroupUncheckedCreateNestedManyWithoutMembersInput
    sentPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutSenderInput
    receivedPrivateMessage?: PrivateMessageUncheckedCreateNestedManyWithoutReceiverInput
    NewFriendSendRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutFromInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedCreateNestedManyWithoutToInput
    friends?: UserUncheckedCreateNestedManyWithoutFriendOfInput
    friendOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type PrivateMessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: PrivateMessageWhereUniqueInput
    update: XOR<PrivateMessageUpdateWithoutConversationInput, PrivateMessageUncheckedUpdateWithoutConversationInput>
    create: XOR<PrivateMessageCreateWithoutConversationInput, PrivateMessageUncheckedCreateWithoutConversationInput>
  }

  export type PrivateMessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: PrivateMessageWhereUniqueInput
    data: XOR<PrivateMessageUpdateWithoutConversationInput, PrivateMessageUncheckedUpdateWithoutConversationInput>
  }

  export type PrivateMessageUpdateManyWithWhereWithoutConversationInput = {
    where: PrivateMessageScalarWhereInput
    data: XOR<PrivateMessageUpdateManyMutationInput, PrivateMessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type UserUpsertWithWhereUniqueWithoutConversationsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutConversationsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateManyWithWhereWithoutConversationsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutConversationsInput>
  }

  export type GroupMessageCreateManySenderInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    groupId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageCreateManySenderInput = {
    id?: string
    content: string
    receiverId: string
    conversationId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageCreateManyReceiverInput = {
    id?: string
    content: string
    senderId: string
    conversationId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewFriendRequestCreateManyFromInput = {
    id?: string
    toUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
  }

  export type NewFriendRequestCreateManyToInput = {
    id?: string
    fromUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    state: $Enums.RequestState
  }

  export type GroupMessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Group?: GroupUpdateOneRequiredWithoutGroupMessagesNestedInput
  }

  export type GroupMessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupMessages?: GroupMessageUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateManyWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReceivedPrivateMessageNestedInput
    Conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type PrivateMessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentPrivateMessageNestedInput
    Conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type PrivateMessageUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: PrivateMessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: PrivateMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewFriendRequestUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
    to?: UserUpdateOneRequiredWithoutNewFriendReceiveRequestNestedInput
  }

  export type NewFriendRequestUncheckedUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
  }

  export type NewFriendRequestUncheckedUpdateManyWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
  }

  export type NewFriendRequestUpdateWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
    from?: UserUpdateOneRequiredWithoutNewFriendSendRequestNestedInput
  }

  export type NewFriendRequestUncheckedUpdateWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
  }

  export type NewFriendRequestUncheckedUpdateManyWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumRequestStateFieldUpdateOperationsInput | $Enums.RequestState
  }

  export type UserUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMessageCreateManyGroupInput = {
    id?: string
    type: $Enums.MessageType
    content: string
    senderId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutGroupMessageNestedInput
  }

  export type GroupMessageUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutMembersNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateManyWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type PrivateMessageCreateManyConversationInput = {
    id?: string
    content: string
    senderId: string
    receiverId: string
    type: $Enums.MessageType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrivateMessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentPrivateMessageNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedPrivateMessageNestedInput
  }

  export type PrivateMessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrivateMessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUpdateManyWithoutSenderNestedInput
    groups?: GroupUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUpdateManyWithoutReceiverNestedInput
    NewFriendSendRequest?: NewFriendRequestUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUpdateManyWithoutToNestedInput
    friends?: UserUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    groupMessage?: GroupMessageUncheckedUpdateManyWithoutSenderNestedInput
    groups?: GroupUncheckedUpdateManyWithoutMembersNestedInput
    sentPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedPrivateMessage?: PrivateMessageUncheckedUpdateManyWithoutReceiverNestedInput
    NewFriendSendRequest?: NewFriendRequestUncheckedUpdateManyWithoutFromNestedInput
    NewFriendReceiveRequest?: NewFriendRequestUncheckedUpdateManyWithoutToNestedInput
    friends?: UserUncheckedUpdateManyWithoutFriendOfNestedInput
    friendOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateManyWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}