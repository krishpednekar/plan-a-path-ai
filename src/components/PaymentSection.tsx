import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Clock,
  Wallet,
  Banknote,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  icon: React.ComponentType<any>;
  description: string;
  processingTime: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "blockchain",
    name: "Blockchain (MATIC)",
    type: "Crypto",
    icon: Wallet,
    description: "Secure and fast cryptocurrency payment",
    processingTime: "Instant"
  },
  {
    id: "upi",
    name: "UPI Payment",
    type: "Digital",
    icon: Smartphone,
    description: "Pay using UPI apps like GPay, PhonePe, Paytm",
    processingTime: "Instant"
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    type: "Traditional",
    icon: CreditCard,
    description: "Visa, MasterCard, Rupay accepted",
    processingTime: "2-3 minutes"
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    type: "Digital",
    icon: Banknote,
    description: "Paytm, PhonePe, Amazon Pay",
    processingTime: "Instant"
  }
];

interface CartItem {
  id: string;
  name: string;
  destination: string;
  duration: string;
  style: string;
  price: number;
  activities: { day: number; activities: string[] }[];
}

// Mock cart items - in real app this would come from global state or context
const mockCartItems: CartItem[] = [
  {
    id: "itinerary-1",
    name: "Adventure Jharkhand Tour",
    destination: "Jharkhand",
    duration: "3-5 Days",
    style: "Adventure",
    price: 2500,
    activities: [
      { day: 1, activities: ["Arrive in Ranchi", "Visit Rock Garden", "Evening at Tagore Hill"] },
      { day: 2, activities: ["Drive to Netarhat", "Sunrise at Magnolia Point", "Lower Ghaghri Falls"] },
      { day: 3, activities: ["Betla National Park Safari", "Wildlife Photography"] }
    ]
  },
  {
    id: "itinerary-2", 
    name: "Cultural Kerala Experience",
    destination: "Kerala",
    duration: "1 Week",
    style: "Cultural",
    price: 4200,
    activities: [
      { day: 1, activities: ["Arrive in Kochi", "Fort Kochi Heritage Walk", "Chinese Fishing Nets"] },
      { day: 2, activities: ["Munnar Tea Gardens", "Eravikulam National Park"] },
      { day: 3, activities: ["Thekkady Spice Plantations", "Periyar Wildlife Sanctuary"] }
    ]
  }
];

export function PaymentSection() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const { toast } = useToast();

  const totalAmount = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    setPaymentSuccess(false);
    setTransactionId("");
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const processPayment = async () => {
    if (selectedItems.length === 0 || !selectedMethod) {
      toast({
        title: "Please select itineraries and payment method",
        description: "Both itinerary selection and payment method are required.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const mockTransactionId = `TXN${Date.now().toString().slice(-8)}`;
      setTransactionId(mockTransactionId);
      setPaymentSuccess(true);
      setProcessing(false);
      
      toast({
        title: "Payment Successful!",
        description: `Transaction ID: ${mockTransactionId}`,
      });
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-muted-foreground mt-1">
            Your TourismAI subscription is now active
          </p>
        </div>

        <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              Itineraries Booked Successfully!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Your payment of ₹{totalAmount} has been processed successfully.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Transaction ID:</span>
                <Badge variant="secondary">{transactionId}</Badge>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Itineraries:</span>
                <span className="font-semibold">{selectedItems.length} selected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount Paid:</span>
                <span className="font-semibold">₹{totalAmount}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full">
                Start Exploring with TourismAI
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Travel Cart</h1>
          <p className="text-muted-foreground mt-1">
            Select your itineraries and pay securely with blockchain technology
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>256-bit Encryption</span>
        </Badge>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card 
            key={item.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-hover ${
              selectedItems.includes(item.id)
                ? "border-2 border-primary bg-primary/5" 
                : "border border-border"
            }`}
            onClick={() => toggleItemSelection(item.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <p className="text-muted-foreground">{item.destination} • {item.duration} • {item.style}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{item.price}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                {item.activities.slice(0, 3).map((day, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <Badge variant="outline" className="text-xs">Day {day.day}</Badge>
                    <span className="text-muted-foreground">{day.activities.join(", ")}</span>
                  </div>
                ))}
                {item.activities.length > 3 && (
                  <p className="text-xs text-muted-foreground">...and more activities</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {cartItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Your cart is empty. Add some itineraries from the Itinerary Planner!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment Methods */}
      {selectedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Choose Payment Method</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={method.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      selectedMethod === method.id
                        ? "border-2 border-primary bg-primary/5"
                        : "border border-border"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{method.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {method.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{method.processingTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Summary & Process */}
      {selectedItems.length > 0 && selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Selected Itineraries:</span>
                <span className="font-semibold">{selectedItems.length}</span>
              </div>
              {cartItems.filter(item => selectedItems.includes(item.id)).map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Processing Fee:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <Button 
              onClick={processPayment}
              disabled={processing}
              className="w-full"
              size="lg"
            >
              {processing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Pay ₹{totalAmount} Securely
                </>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Your payment is secured with 256-bit SSL encryption and blockchain technology.
              Cancel anytime within 7 days for a full refund.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}