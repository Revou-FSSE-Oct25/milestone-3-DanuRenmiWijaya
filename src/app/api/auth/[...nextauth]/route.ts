import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const users = [
          { id: "1", name: "Budi Santoso", username: "admin", password: "password123", role: "Admin" },
          { id: "2", name: "Siti Aminah", username: "editor", password: "password123", role: "Editor" },
          { id: "3", name: "Andi Wijaya", username: "user", password: "password123", role: "User" },
        ];

        const user = users.find((u) => u.username === credentials?.username);

        if (user && credentials?.password === user.password) {
          return user; 
        }
        
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
