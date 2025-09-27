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

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 999,
    features: [
      "AI Recommendations",
      "Basic Itinerary Planning",
      "Chat Support (English)",
      "Map Integration"
    ]
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 1500,
    features: [
      "Everything in Basic",
      "Multilingual Chat (4 languages)",
      "Advanced Itinerary Customization",
      "Priority Support",
      "Offline Maps"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise Plan", 
    price: 2999,
    features: [
      "Everything in Premium",
      "Group Travel Planning",
      "Custom Recommendations",
      "24/7 Phone Support",
      "Travel Insurance Integration"
    ]
  }
];

export function PaymentSection() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const { toast } = useToast();

  const selectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setAmount(pkg.price);
    setPaymentSuccess(false);
    setTransactionId("");
  };

  const processPayment = async () => {
    if (!selectedPackage || !selectedMethod) {
      toast({
        title: "Please select package and payment method",
        description: "Both package and payment method are required.",
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
              Welcome to {selectedPackage?.name}!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Your payment of ₹{amount} has been processed successfully.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Transaction ID:</span>
                <Badge variant="secondary">{transactionId}</Badge>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Package:</span>
                <span className="font-semibold">{selectedPackage?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount Paid:</span>
                <span className="font-semibold">₹{amount}</span>
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
          <h1 className="text-3xl font-bold text-foreground">Secure Payments</h1>
          <p className="text-muted-foreground mt-1">
            Choose your plan and pay securely with blockchain technology
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>256-bit Encryption</span>
        </Badge>
      </div>

      {/* Package Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-hover ${
              selectedPackage?.id === pkg.id 
                ? "border-2 border-primary bg-primary/5" 
                : "border border-border"
            } ${pkg.popular ? "relative" : ""}`}
            onClick={() => selectPackage(pkg)}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="text-3xl font-bold text-primary">
                ₹{pkg.price}
                <span className="text-sm text-muted-foreground font-normal">/month</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      {selectedPackage && (
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
      {selectedPackage && selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Package:</span>
                <span className="font-semibold">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">₹{amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{amount}</span>
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
                  Pay ₹{amount} Securely
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