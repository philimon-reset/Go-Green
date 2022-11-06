import { useParams } from "react-router-dom";
import "./style.css";
import { FormLabel, Button, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useState } from "react";

import server from "../../service/server";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useGeoLocation } from "./useGeoLocation";

function PictureButton({ title, setPicture }) {
  return (
    <>
      <FormLabel
        backgroundColor="green.500"
        size="lg"
        color="white"
        borderRadius={5}
        p={3}
      >
        <AddIcon w={5} h={5} color="white.500" />
        <input
          accept="image/*"
          id="after-pic"
          type="file"
          capture="environment"
          placeholder="Take a pic!"
          style={{
            display: "none",
          }}
          onChange={(e) => setPicture(e.target.files[0])}
        />
        &nbsp;{title}
      </FormLabel>
    </>
  );
}

const index = () => {
  const { id } = useParams();
  const [picture, setPicture] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["bounty"],
    queryFn: async () => {
      const { data } = await server.get(`/bounty/${id}`);
      return data;
    },
  });

  const uploadPicture = useMutation({
    mutationFn: async (vars) => {
      const { data } = await server.post(`/file/${vars.from}`, vars, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="planter-container">
      <h1 className="title">Plant Submission</h1>
      <div className="photo-submission-container">
        {picture == null ? (
          data.data.Before_pic == null ? (
            <PictureButton title={"Before Pic"} setPicture={setPicture} />
          ) : (
            <PictureButton title={"After Pic"} setPicture={setPicture} />
          )
        ) : (
          <Flex gap={7}>
            {/* <Img src={dir9picture}></Img> */}
            <Button
              onClick={() => {
                if (data.data.Before_pic == null) {
                  uploadPicture.mutate({
                    before_pic: picture,
                    bountyId: id,
                    from: "before",
                  });
                } else {
                  const location = useGeoLocation();
                  uploadPicture.mutate({
                    after_pic: picture,
                    bountyId: id,
                    location_end: JSON.stringify({
                      lat: location.latitude,
                      lon: location.longitude,
                    }),
                    from: "after",
                  });
                }
              }}
            >
              Upload!
            </Button>
            <Button onClick={() => setPicture(null)}>Cancel</Button>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default index;
