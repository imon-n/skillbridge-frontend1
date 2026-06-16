// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";



// export function LoginForm() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });



// const handleLogin = async () => {
//   try {
//     const res = await fetch("https://skillbridge-backend-6mpi.onrender.com/api/auth/sign-in/email", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       toast.error(data?.message || "Login failed");
//       return;
//     }
  
//    toast.success("Login successful!");
// router.push("/dashboard"); // 👈 full URL না, relative path দাও
//   } catch (err) {
//     toast.error("Something went wrong");
//   }
// };

//   // ✅ GOOGLE LOGIN
//   // const handleGoogle = async () => {
//   //   await authClient.signIn.social({
//   //     provider: "google",
//   //    callbackURL: "https://skillbridge-frontend-ten-nu.vercel.app",
//   //   });
//   // };

// const handleGoogle = async () => {
//   await authClient.signIn.social({
//     provider: "google",
//     callbackURL: "https://skillbridge-frontend-ten-nu.vercel.app/dashboard",
//   });
// };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Login</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-3">
//         <Input placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <Input type="password" placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//       </CardContent>

//       <CardFooter className="flex flex-col gap-3">
//         <Button onClick={handleLogin} className="w-full">
//           Login
//         </Button>

//         <Button onClick={handleGoogle} variant="outline" className="w-full">
//           Continue with Google
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function LoginForm() {
  const router = useRouter();

  const API_URL = "https://skillbridge-backend-6mpi.onrender.com";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

const handleLogin = async () => {
  try {
    const loginRes = await fetch(
      `${API_URL}/api/auth/sign-in/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      }
    );

    if (!loginRes.ok) {
      const error = await loginRes.json();
      console.log(error);
      toast.error("Login failed");
      return;
    }

    // একটু wait দাও cookie save হওয়ার জন্য
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sessionRes = await fetch(
      `${API_URL}/api/auth/get-session`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!sessionRes.ok) {
      toast.error("Session not found");
      return;
    }

    const sessionData = await sessionRes.json();

    console.log("SESSION1:", sessionData);

    if (!sessionData?.user) {
      toast.error("User not found");
      return;
    }

    toast.success("Login successful");

    const role = sessionData.user.role;

    // if (role === "ADMIN") {
    //   router.replace("/admin");
    // } else if (role === "TUTOR") {
    //   router.replace("/tutors");
    // } else {
      router.replace("/dashboard");
    // }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};

//  const handleGoogle = async () => {
//     await authClient.signIn.social({
//       provider: "google",
//      callbackURL: "https://assignment5-frontend-seven.vercel.app",
//     });
//   };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
        {/* <Button onClick={signInWithGoogle} className="w-full mt-2">
          Login with Google
        </Button> */}
      </CardFooter>
    </Card>
  );
}