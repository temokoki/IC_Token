import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";

actor Token {
  let totalSupply : Nat = 100000000000;
  let symbol : Text = "SMPL";

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = TrieMap.TrieMap<Principal, Nat>(Principal.equal, Principal.hash);

  public func initTokens() {
    if (balances.size() <= 0) balances.put(Principal.fromActor(Token), totalSupply);
  };

  public query func checkBalance(principal : Principal) : async Nat {
    switch (balances.get(principal)) {
      case null return 0;
      case (?result) return result;
    };
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared ({ caller }) func getFreeTokens() : async Text {
    if (balances.get(caller) == null) {
      return await transfer(caller, 100);
    } else {
      return "Already Claimed";
    };
  };

  public shared ({ caller }) func transfer(recipientPrincipal : Principal, amount : Nat) : async Text {
    let callerBalance = await checkBalance(caller);
    if (callerBalance >= amount) {
      let newCallerBalance : Nat = callerBalance - amount;
      balances.put(caller, newCallerBalance);

      let recipientBalance = await checkBalance(recipientPrincipal);
      let newRecipientBalance = recipientBalance + amount;
      balances.put(recipientPrincipal, newRecipientBalance);

      return "Transferred Successfully";
    } else {
      return "Insufficient Funds";
    };

  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := TrieMap.fromEntries<Principal, Nat>(balanceEntries.vals(), Principal.equal, Principal.hash);
  };
};
