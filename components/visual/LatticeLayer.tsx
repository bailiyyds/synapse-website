"use client";
import dynamic from "next/dynamic";
const Lattice = dynamic(() => import("./WebGLLattice"), { ssr: false });
export default function LatticeLayer({ close = false }: { close?: boolean }) {
  return <Lattice close={close} />;
}
