import { useQuery } from "@tanstack/react-query";
import http from "..";

export default function useUser(id: number) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      http.get(`http://localhost:8080/getUser/${id}`).then((res) => res.data),
  });
}
