import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'balance' : () => Promise<bigint>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'getPrincipal' : () => Promise<Principal>,
  'getSymbol' : () => Promise<string>,
  'mint10k' : () => Promise<string>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
