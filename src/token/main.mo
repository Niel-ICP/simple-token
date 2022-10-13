import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor NielCoin {
    let owner : Principal = Principal.fromText("wgzi3-takje-gi5pc-3b6wr-3aynj-zto7v-l5feg-3536u-ejztu-qm4d5-jae");
    let canister : Principal = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");
    let totalSupply : Nat = 1000000000;
    let symbol: Text = "NCoin";

    stable var balanceEntries: [(Principal, Nat)] = [];
    stable var mintedEntries: [(Principal, Bool)] = [];

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    var hasMinted = HashMap.HashMap<Principal, Bool>(1, Principal.equal, Principal.hash);

    if(balances.size() < 1) {
            balances.put(canister, totalSupply);
    };

    public query func balanceOf (address: Principal): async Nat {
        let balance : Nat = switch (balances.get(address)) {
            case null 0;
            case(?result) result;
        };
        return balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    public shared(msg) func balance(): async Nat {
        let balance : Nat = switch (balances.get(msg.caller)) {
        case null 0;
        case(?result) result;
        };
        return balance;
    };

    // public shared(msg)func mint (to: Principal, amount: Nat): async Text {
    //     let balance = await balanceOf(to);
    //     let oBalance = await balanceOf(owner);
    //     var _amount: Nat = balance + amount;
    //     var _oAmount: Nat = oBalance - amount;
    //     balances.put(to, _amount);
    //     balances.put(owner, _oAmount);
    //     return ("Success!");
    // };

    public shared(msg) func mint10k(): async Text {
        let minted : Bool = switch (hasMinted.get(msg.caller)) {
        case null false;
        case(?result) result;
        };
        if(minted == true) {
            return ("FAILED! You have already used the faucet");
        };
        let result = await transfer(msg.caller, 10000);
        hasMinted.put(msg.caller, true);
        return (result);
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
        let fBalance = await balanceOf(msg.caller);
        if(fBalance < amount) {
            return "Not enough NielCoin to transfer";
        };
        let tBalance = await balanceOf(to);
        balances.put(msg.caller, fBalance-amount);
        balances.put(to, tBalance+amount);
        return "Transfer Successful!";
    };

    public shared(msg) func getPrincipal(): async Principal {
        return msg.caller;
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
        mintedEntries := Iter.toArray(hasMinted.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        hasMinted := HashMap.fromIter<Principal, Bool>(mintedEntries.vals(), 1, Principal.equal, Principal.hash);
    };
}