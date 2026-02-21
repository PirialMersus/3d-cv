'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Avatar from './Avatar';


const PersonalAvatar = () => {
    const avatarRef = useRef<THREE.Group>(null);
    const { size } = useThree();

    // Глобальные координаты для отслеживания
    const targetState = useRef({
        mouse: { x: 0, y: 0 },
        scroll: 0
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetState.current.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetState.current.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const handleScroll = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            targetState.current.scroll = scrollPercent || 0;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isMobile = size.width < 768;
    const adaptiveScale = isMobile ? 2.5 : 3.5;
    const adaptivePosition: [number, number, number] = isMobile ? [0, -3.5, 0] : [2, -4.5, 0];

    useFrame((state) => {
        if (!avatarRef.current) return;

        const head = avatarRef.current.getObjectByName('Head') as THREE.Bone;
        const neck = avatarRef.current.getObjectByName('Neck') as THREE.Bone;

        if (head && neck) {
            // Target rotations for bones
            // Y: Yaw (horizontal) - Default 50 degrees left (approx -0.87 rad)
            // Sensitivity set to exactly 2.2x as requested
            const targetRotY = targetState.current.mouse.x * 2.2 - 0.87;

            // X: Pitch (vertical) - Subtle 1.0x sensitivity
            const targetRotX = -targetState.current.mouse.y * 1.0;

            // Z: Roll (tilt)
            const targetRotZ = targetState.current.mouse.x * -0.6;

            // Distribute rotation between neck and head for more natural look
            neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, targetRotY * 0.3, 0.1);
            head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetRotY * 0.7, 0.1);

            head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetRotX, 0.1);
            head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, targetRotZ, 0.1);
        }

        // Floating effect
        const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        avatarRef.current.position.y = adaptivePosition[1] + floatY;
    });

    return (
        <Avatar
            ref={avatarRef}
            scale={adaptiveScale}
            position={adaptivePosition}
        />
    );
};

const Particles = () => {
    // Reverted particle count to original
    const count = 2000;
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 40;     // X
            p[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
            p[i * 3 + 2] = (Math.random() - 0.5) * 40; // Z
        }
        return p;
    }, []);

    // Create a circular texture programmatically so particles are circles, not squares
    const circleTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        if (context) {
            context.beginPath();
            context.arc(32, 32, 32, 0, 2 * Math.PI, false);
            context.fillStyle = 'white';
            context.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }, []);

    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (!particlesRef.current) return;

        // Continuous Flow: Move each particle individually
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

        // Moderate "Space Cruise" speed (approx 3x original, less than half of previous)
        // Using delta for consistent speed regardless of framerate
        const speed = 10.0 * delta;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3 + 2] += speed; // Move Z forward

            // If the particle flies past the camera, reset it to the back
            if (positions[i3 + 2] > 15) {
                positions[i3 + 2] = -25;
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef} renderOrder={0}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06} // Compensate visual size for circular crop
                map={circleTexture}
                alphaTest={0.5} // Discard transparent square corners
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                depthTest={true} // Test against avatar's depth buffer (Avatar renderOrder=1)

                // Nuclear Occlusion: ONLY draw stars where stencil is NOT 1 (where avatar is not)
                stencilWrite={true}
                stencilRef={1}
                stencilFunc={THREE.NotEqualStencilFunc}
            />
        </points>
    );
};

const Background3D = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020202]">
            <Canvas dpr={[1, 2]} gl={{ localClippingEnabled: true, stencil: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={3.0} />
                <pointLight position={[10, 10, 10]} intensity={12} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={10} color="#bc13fe" />
                <React.Suspense fallback={null}>
                    <PersonalAvatar />
                </React.Suspense>
                <Particles />
                <fog attach="fog" args={['#020202', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default Background3D;
