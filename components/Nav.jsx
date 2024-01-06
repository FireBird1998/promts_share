"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setProvider();
  }, [])

  return (
   <nav className="flex-between w-full mb-16 pt-3">
      <Link href={`/`} className="flex gap-2 flex-center">
        <Image src="assets/images/logo.svg" alt="logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promts Share</p>
      </Link>

      {/* DeskTop Navigation   */}
      <div className="sm:flex hidden">
        {session?.user  ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={`/create-prompt`} className="black_btn">Create Post</Link>
            <button 
              className="outline_btn" 
              type="button" 
              onClick={() => signOut()} 
            > 
              Sign Out
            </button>
            <Link href={`/profile`}>
              <Image src={session?.user.image} alt="profile" width={37} height={37} className="object-contain rounded-full" />
            </Link>
          </div>
        ):(
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                className="black_btn" 
                type="button" onClick={() => signIn(provider.id)} 
                key={provider.name}
              >signIn</button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image}
              alt="profile" 
              width={37} 
              height={37} 
              className="object-contain rounded-full" 
              onClick={() => {setToggleDropdown((prev) => !prev)}}
              // This is the way to toggle 
            />
            {toggleDropdown && (
              <div className="dropdown absolute right-0 top-[60px] bg-white rounded-md shadow-md">
                <Link 
                  href={`/profile`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                  // This is the way to toggle
                >
                  My Profile
                </Link>
                <Link 
                  href={`/create-prompt`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                  // This is the way to toggle
                >
                  Create Promt
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                className="black_btn" 
                type="button" onClick={() => signIn(provider.id)} 
                key={provider.name}
              >signIn</button>
            ))}
          </>
        )}

      </div>

      

   </nav> 
  )
}

export default Nav