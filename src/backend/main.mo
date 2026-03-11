import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Lead = {
    name : Text;
    phone : Text;
    email : Text;
    timestamp : Time.Time;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Int.compare(lead1.timestamp, lead2.timestamp);
    };
  };

  let leads = Map.empty<Text, Lead>();

  public shared ({ caller }) func submitLead(name : Text, phone : Text, email : Text) : async () {
    let timestamp = Time.now();
    let lead : Lead = {
      name;
      phone;
      email;
      timestamp;
    };
    leads.add(timestamp.toText(), lead);
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access leads");
    };
    let leadArray = leads.values().toArray();
    leadArray.sort();
  };
};
