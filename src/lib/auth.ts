import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        // .env'den admin bilgilerini al
        const adminUsername = process.env.ADMIN_USERNAME || 'admin'
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
        
        if (credentials?.username === adminUsername && credentials?.password === adminPassword) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@isg.com',
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin'
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  },
  session: {
    strategy: 'jwt' as const
  }
}

export default NextAuth(authOptions) 