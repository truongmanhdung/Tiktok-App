import { supabase } from "@/Apps/Utils/SupabaseConfig";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

type Props = {};

const HomeScreen = (props: Props) => {
  const { user } = useUser();

  const updateProfile = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ image: user?.imageUrl }) // update trường nào
      .eq("email", user?.primaryEmailAddress?.emailAddress) // kiểm tra điều kiện
      .is("image", null) // check nếu null thì mới update
      .select(); // thực hiện hành động
      console.log(data);
  };

  useEffect(() => {
    user && updateProfile()
  }, [user])
  

  return (
    <View>
      <Text>{user?.firstName}</Text>
    </View>
  );
};

export default HomeScreen;
