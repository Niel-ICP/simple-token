export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balance' : IDL.Func([], [IDL.Nat], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getPrincipal' : IDL.Func([], [IDL.Principal], []),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'mint10k' : IDL.Func([], [IDL.Text], []),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
