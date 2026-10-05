import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You’re on the list");
      setEmail("");
    }
  };

  return (
    <section className="newsletter">
      <span>STUDIO NOTES / OCCASIONAL</span>
      <h2>
        GOOD THINGS,
        <br />
        <em>IN YOUR INBOX.</em>
      </h2>
      <p>New collections, design stories and occasional things worth knowing.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
        />
        <Button type="submit">
          JOIN THE LIST <ArrowRight />
        </Button>
      </form>
    </section>
  );
}
