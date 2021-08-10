import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      authUser.user.updateProfile({
        displayName: `${email.match(/^([^@]*)@/)[1]}`,
        phoneNumber: 1
      });
      console.log(authUser)
      db
        .collection('users')
        .doc(authUser.user.uid)
        .set({
          role: 'user'
        })



    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {

        db.collection('users')
          .doc(user.uid).get().then(doc => {
            console.log(doc.exists)
            if (doc.exists) {
              let { role } = doc.data()
              console.log(role)
              setCurrentUser({ ...user, role })
              setLoading(false)

            }
          })
      } else {
        console.log("here")
        setCurrentUser(user)
        console.log(user)
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
