/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useStarkProfile } from "@starknet-react/core";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";

import useBlockies from "~/hooks/useBlockies";

interface ProfilePictureProps {
  address: string;
}

export default function ProfilePicture({
  address,
  className,
}: PropsWithClassName<ProfilePictureProps>) {
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  const { blockiesImageSrc } = useBlockies({ address });
  const [hasImageFailed, setHasImageFailed] = useState(false);

  if (
    starkProfile?.name !== undefined &&
    starkProfile?.profilePicture !== undefined &&
    !hasImageFailed
  ) {
    return (
      <img
        className={className}
        alt="Starknet Id profile"
        src={starkProfile?.profilePicture}
        onError={() => setHasImageFailed(true)}
      />
    );
  }

  return <img className={className} alt="Blockies" src={blockiesImageSrc} />;
}
