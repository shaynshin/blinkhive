"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { JupiterAllowedTokens } from "@/lib/jupiter";
import { useWallet } from "@jup-ag/wallet-adapter";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function JupiterPage() {
  const [idxPay, setIdxPay] = useState<number>(0);
  const [idxReceive, setIdxReceive] = useState<number>(1);
  const [allowedTokens, setAllowedTokens] = useState<JupiterAllowedTokens[]>();
  const fullDomain = window.location.host;
  const wallet = useWallet();

  const handleCopyClick = async (textToCopy: string) => {
    try {
      const currentDomain = `${window.location.protocol}//${window.location.host}`;
      const fullTextToCopy = `${currentDomain}/buy/${textToCopy}`;
      await navigator.clipboard.writeText(fullTextToCopy);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const fetchAndSetAllowedTokens = async () => {
      const response = await fetch("/api/jupiter");

      if (!response.ok) throw new Error("Failed to fetch allowed tokens");

      const { jupiterAllowedTokens: allowedTokens } = await response.json();
      setAllowedTokens(allowedTokens);
    };
    fetchAndSetAllowedTokens();
  }, []);

  return (
    <div>
      <div className="flex gap-1">
        <Image
          src={"https://i.ibb.co/5cJBJJV/jupiter.png"}
          width={32}
          height={32}
          alt="Jupiter logo"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-bold mb-6">Jupiter Swap</h1>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-0 mb-36">
        <div className="bg-base-100 rounded-2xl p-4 shadow-lg w-full max-w-sm">
          <div className="flex-col relative">
            {/* From Section */}
            <div className="flex justify-between my-2">
              <label
                htmlFor="fromValue"
                className="text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                User will be paying
              </label>
            </div>
            <DropdownFull
              selectedIdx={idxPay}
              opposingIdx={idxReceive}
              allowedTokens={allowedTokens}
              setSelectedIdx={setIdxPay}
            />

            {/* Swap Button */}
            <div className="relative flex justify-center my-2">
              <hr className="absolute w-full border-[rgba(25,35,45,0.35)] top-[calc(50%-1px)]" />
              <div className="inline-block">
                <button
                  type="button"
                  className="group/flip bg-base-200 w-8 h-8 rounded-full cursor-pointer flex flex-col justify-center border-[3px] border-[rgba(25,35,45,0.75)] text-white-25 hover:border-base-100 hover:shadow-lg"
                  onClick={() => {
                    const temp = idxPay;
                    setIdxPay(idxReceive);
                    setIdxReceive(temp);
                  }}
                >
                  <span className="w-full fill-current flex justify-center transition-none">
                    <svg
                      width="21"
                      height="22"
                      viewBox="0 0 21 22"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.51043 7.47998V14.99H7.77043V7.47998L9.66043 9.36998L10.5505 8.47994L7.5859 5.51453C7.3398 5.26925 6.94114 5.26925 6.69504 5.51453L3.73047 8.47994L4.62051 9.36998L6.51043 7.47998Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.4902 14.52V7.01001H13.2302V14.52L11.3402 12.63L10.4502 13.5201L13.4148 16.4855C13.6609 16.7308 14.0595 16.7308 14.3056 16.4855L17.2702 13.5201L16.3802 12.63L14.4902 14.52Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* To Section */}
            <div className="flex justify-between my-2">
              <label className="text-xs sm:text-sm font-medium">
                To receive
              </label>
            </div>
            <DropdownFull
              selectedIdx={idxReceive}
              opposingIdx={idxPay}
              allowedTokens={allowedTokens}
              setSelectedIdx={setIdxReceive}
            />

            {/* Blink Section */}
            <div className="flex flex-col my-4">
              <div className="flex justify-between my-2">
                <label className="text-xs sm:text-sm font-medium">
                  Your refferal blink
                </label>
              </div>
              <div
                className="join"
                onClick={() => {
                  if (allowedTokens && wallet.connected)
                    handleCopyClick(
                      `jup/${allowedTokens[idxPay].symbol}-${
                        allowedTokens[idxReceive].symbol
                      }?ref=${wallet.publicKey?.toBase58()}`
                    );
                }}
              >
                <div className="btn btn-ghost btn-sm btn-disabled w-9/12 !text-gray-300 justify-between border-white/15 truncate join-item hover:border-white/30 hover:text-gray-100">
                  <p className="truncate">
                    {allowedTokens &&
                      wallet.connected &&
                      `${fullDomain}/buy/jup/${allowedTokens[idxPay].symbol}-${
                        allowedTokens[idxReceive].symbol
                      }?ref=${wallet.publicKey?.toBase58()}`}
                  </p>
                </div>
                <button className="btn btn-primary  flex flex-col btn-sm w-3/12 text-gray-300 border-white/15 join-item hover:border-white/30 hover:text-gray-100">
                  <ClipboardDocumentIcon className="w-4" />
                  copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DropdownFull: React.FC<{
  selectedIdx: number;
  opposingIdx: number;
  allowedTokens: JupiterAllowedTokens[] | undefined;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
}> = ({ selectedIdx, opposingIdx, allowedTokens, setSelectedIdx }) => {
  return (
    <Menu as="div" className="relative inline-flex w-full">
      {({ open }) => (
        <>
          <MenuButton
            className="btn w-full justify-between min-w-[11rem] text-gray-300 bg-base-300 border-white/15 hover:border-white/30 hover:text-gray-100"
            aria-label="Select option"
          >
            <span className="flex items-center">
              <span>
                {allowedTokens && (
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Coin image"
                      src={allowedTokens[selectedIdx].logoURI}
                      className="w-4 h-4 rounded-full"
                    />
                    <span>{allowedTokens[selectedIdx].symbol}</span>
                  </div>
                )}
              </span>
            </span>
            <svg
              className="shrink-0 ml-1 fill-current text-gray-500"
              width="11"
              height="7"
              viewBox="0 0 11 7"
            >
              <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
            </svg>
          </MenuButton>
          <Transition
            as="div"
            className="z-10 absolute top-full left-0 w-full bg-base-300 border border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MenuItems className="font-medium text-sm text-gray-300 divide-y divide-gray-700/60 max-h-64 overflow-y-auto focus:outline-none">
              {allowedTokens &&
                allowedTokens.map(
                  (option, optionIndex) =>
                    optionIndex !== opposingIdx && (
                      <MenuItem key={optionIndex}>
                        {({ active }) => (
                          <button
                            className={`flex items-center justify-between w-full py-2 px-3 cursor-pointer ${
                              active ? "bg-gray-700/20" : ""
                            } ${optionIndex === selectedIdx && "text-accent"}`}
                            onClick={() => {
                              setSelectedIdx(optionIndex);
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <Image
                                alt="Coin image"
                                src={option.logoURI}
                                className="w-4 h-4 rounded-full"
                              />
                              <span>{option.symbol}</span>
                            </div>
                            <svg
                              className={`shrink-0 mr-2 fill-current text-accent ${
                                optionIndex !== selectedIdx && "invisible"
                              }`}
                              width="12"
                              height="9"
                              viewBox="0 0 12 9"
                            >
                              <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                          </button>
                        )}
                      </MenuItem>
                    )
                )}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
};
