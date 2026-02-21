import React, { useEffect, useLayoutEffect, useRef, forwardRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Avatar = forwardRef<THREE.Group, any>((props, ref) => {
    const group = useRef<THREE.Group>(null);
    const { nodes, materials, animations } = useGLTF("/models/avatar.glb") as any;
    const { actions } = useAnimations(animations, group);

    const opaqueMaterials = React.useMemo(() => {
        const bodyMat = materials.avaturn_body_material.clone();
        const lookMat = materials.avaturn_look_0_material.clone();
        const shoesMat = materials.avaturn_shoes_0_material.clone();

        [bodyMat, lookMat, shoesMat].forEach((m: any) => {
            m.transparent = false;
            m.opacity = 1.0;
            m.depthWrite = true;
            m.depthTest = true;
            m.blending = THREE.NoBlending; // Absolute solidity
            m.side = THREE.DoubleSide;

            // Definitive Stencil Masking: Write "1" to every pixel the avatar covers
            m.stencilWrite = true;
            m.stencilRef = 1;
            m.stencilFunc = THREE.AlwaysStencilFunc;
            m.stencilZPass = THREE.ReplaceStencilOp;

            m.needsUpdate = true;
        });

        // Match hair color to jacket (Dark Brown #4e3621)
        const hairMat = materials.avaturn_hair_0_material;
        if (hairMat) {
            hairMat.color.set("#4e3621");
            // Hair also writes to stencil to block stars
            hairMat.stencilWrite = true;
            hairMat.stencilRef = 1;
            hairMat.stencilFunc = THREE.AlwaysStencilFunc;
            hairMat.stencilZPass = THREE.ReplaceStencilOp;
        }

        return {
            body: bodyMat,
            look: lookMat,
            shoes: shoesMat,
            hair: hairMat
        };
    }, [materials]);

    useLayoutEffect(() => {
        if (actions["gennadii_breatning"]) {
            actions["gennadii_breatning"].reset().fadeIn(0.5).play();
        }
    }, [actions]);

    // Expose the internal group ref to the parent ref
    React.useImperativeHandle(ref, () => group.current!);

    return (
        <group ref={group} {...props} dispose={null} renderOrder={100}>
            <group name="Scene">
                <group name="emilian-kasemi">
                    <skinnedMesh
                        name="avaturn_body"
                        geometry={nodes.avaturn_body.geometry}
                        material={opaqueMaterials.body}
                        skeleton={nodes.avaturn_body.skeleton}
                        renderOrder={100}
                    />
                    <skinnedMesh
                        name="avaturn_hair_0"
                        geometry={nodes.avaturn_hair_0.geometry}
                        material={opaqueMaterials.hair}
                        skeleton={nodes.avaturn_hair_0.skeleton}
                        renderOrder={101}
                    />
                    <skinnedMesh
                        name="avaturn_look_0"
                        geometry={nodes.avaturn_look_0.geometry}
                        material={opaqueMaterials.look}
                        skeleton={nodes.avaturn_look_0.skeleton}
                        renderOrder={100}
                    />
                    <skinnedMesh
                        name="avaturn_shoes_0"
                        geometry={nodes.avaturn_shoes_0.geometry}
                        material={opaqueMaterials.shoes}
                        skeleton={nodes.avaturn_shoes_0.skeleton}
                        renderOrder={100}
                    />
                    <primitive object={nodes.Hips} />
                </group>
            </group>
        </group>
    );
});

Avatar.displayName = "Avatar";

export default Avatar;

useGLTF.preload("/models/avatar.glb");
