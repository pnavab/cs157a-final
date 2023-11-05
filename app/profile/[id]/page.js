'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const BASE_POST_URL = "/api/posts";
const BASE_USER_URL = "/api/users";

export default function Profile(props) {
  const path = usePathname();
  const userId = path.slice(path.lastIndexOf('/') + 1);
  const [userPosts, setUserPosts] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`${BASE_USER_URL}/${userId}`);
        const userData = await userResponse.json();
        setUser(userData.username);
      } catch (error) {
        setUser(null);
      }
      try {
        const postResponse = await fetch(`${BASE_POST_URL}/user/${userId}`);
        const postData = await postResponse.json();
        setUserPosts(postData);
      } catch (error) {
        console.error('Error fetching information: ', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet" />
      <main className="flex min-h-screen flex-col items-center">
        {user !== null ? (
          <>
            <div className="relative flex place-items-center" style={{height : '35vh'}}>
              <p2 style={{fontSize : '4rem'}}> {user} </p2>
            </div>
            <div className="w-full max-w-xs">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div id="posts">
                {userPosts && userPosts.map(post => (
                  <div key={post.id} className="mb-5">
                    <a href={`/posts/${post.id}`} target="_blank">
                      <p>{post.title}</p>
                    </a>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </>
        ) : (
          <div>User not found</div>
        )}
      </main>
    </>
  )
}