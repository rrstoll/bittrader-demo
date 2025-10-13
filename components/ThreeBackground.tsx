"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const networkLinesRef = useRef<THREE.LineSegments | null>(null);
  const frameIdRef = useRef<number>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 15);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    // Style the canvas to be visible but behind content
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    
    // Append to the hero section container
    const heroSection = document.querySelector('section');
    if (heroSection) {
      heroSection.appendChild(renderer.domElement);
    } else {
      document.body.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // Create particles (representing data points/nodes)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 20;

      // Colors (orange/yellow gradient)
      const color = new THREE.Color();
      color.setHSL(0.05 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      map: null, // Ensure no texture map
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;

    // Create network lines (connecting nodes)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxConnections = 200;

    for (let i = 0; i < maxConnections; i++) {
      const idx1 = Math.floor(Math.random() * particlesCount) * 3;
      const idx2 = Math.floor(Math.random() * particlesCount) * 3;

      linePositions.push(
        posArray[idx1],
        posArray[idx1 + 1],
        posArray[idx1 + 2]
      );
      linePositions.push(
        posArray[idx2],
        posArray[idx2 + 1],
        posArray[idx2 + 2]
      );

      // Orange color for lines
      const lineColor = new THREE.Color(0xf97316);
      lineColors.push(lineColor.r, lineColor.g, lineColor.b);
      lineColors.push(lineColor.r, lineColor.g, lineColor.b);
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);
    networkLinesRef.current = linesMesh;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xf97316, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create floating Bitcoin symbols using HTML elements
    const createBitcoinSymbol = (x: number, y: number, size: number = 48, speed: number = 1, pattern: 'circular' | 'figure8' | 'wave' = 'circular') => {
      // Create HTML element for Bitcoin symbol
      const bitcoinElement = document.createElement('div');
      bitcoinElement.innerHTML = '₿';
      bitcoinElement.style.position = 'absolute';
      bitcoinElement.style.fontSize = size + 'px';
      bitcoinElement.style.fontWeight = 'bold';
      bitcoinElement.style.color = '#f97316';
      bitcoinElement.style.textShadow = '0 0 20px #f97316';
      bitcoinElement.style.pointerEvents = 'none';
      bitcoinElement.style.zIndex = '2';
      bitcoinElement.style.fontFamily = 'Arial, sans-serif';
      bitcoinElement.style.left = x + '%';
      bitcoinElement.style.top = y + '%';
      bitcoinElement.style.transform = 'translate(-50%, -50%)';
      
      // Append to hero section instead of body
      const heroSection = document.querySelector('section');
      if (heroSection) {
        heroSection.appendChild(bitcoinElement);
      } else {
        document.body.appendChild(bitcoinElement);
      }
      
      return {
        element: bitcoinElement,
        baseX: x,
        baseY: y,
        speed: speed,
        pattern: pattern,
        phase: Math.random() * Math.PI * 2 // Random starting phase
      };
    };

    // Add 5 Bitcoin symbols with smaller, more subtle sizes
    const bitcoinSymbols = [
      createBitcoinSymbol(50, 30, 24, 0.3, 'circular'),
      createBitcoinSymbol(50, 50, 22, 0.4, 'figure8'),
      createBitcoinSymbol(50, 70, 26, 0.35, 'wave'),
      createBitcoinSymbol(30, 50, 20, 0.25, 'circular'),
      createBitcoinSymbol(70, 50, 28, 0.45, 'figure8')
    ];

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    let bitcoinTime = 0;
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      time += 0.001; // Slow timing for Three.js animations
      bitcoinTime += 0.008; // Slower, more elegant timing for Bitcoin symbols

      // Rotate particles slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.5;
        particlesRef.current.rotation.x = time * 0.3;
      }

      // Rotate network lines
      if (networkLinesRef.current) {
        networkLinesRef.current.rotation.y = time * 0.3;
        networkLinesRef.current.rotation.x = time * 0.2;
      }

      // Animate Bitcoin symbols with smooth patterns
      bitcoinSymbols.forEach((symbol) => {
        const t = bitcoinTime * symbol.speed + symbol.phase;
        let floatX = 0;
        let floatY = 0;
        
        switch (symbol.pattern) {
          case 'circular':
            // Large circular motion that crosses screen
            floatX = Math.sin(t) * 15;
            floatY = Math.cos(t) * 15;
            break;
          case 'figure8':
            // Figure-8 that spans across screen
            floatX = Math.sin(t) * 20;
            floatY = Math.sin(t * 2) * 10;
            break;
          case 'wave':
            // Wave pattern that travels across screen
            floatX = Math.sin(t * 0.5) * 25;
            floatY = Math.cos(t * 0.8) * 12;
            break;
        }
        
        const newX = symbol.baseX + floatX;
        const newY = symbol.baseY + floatY;
        
        // Update position smoothly
        symbol.element.style.left = newX + '%';
        symbol.element.style.top = newY + '%';
      });

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Update Bitcoin symbol positions on resize
      bitcoinSymbols.forEach((symbol) => {
        symbol.element.style.left = symbol.baseX + '%';
        symbol.element.style.top = symbol.baseY + '%';
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (renderer.domElement) {
        const heroSection = document.querySelector('section');
        if (heroSection && heroSection.contains(renderer.domElement)) {
          heroSection.removeChild(renderer.domElement);
        } else if (document.body.contains(renderer.domElement)) {
          document.body.removeChild(renderer.domElement);
        }
      }

      // Clean up Bitcoin HTML elements
      bitcoinSymbols.forEach(symbol => {
        if (symbol.element && symbol.element.parentNode) {
          symbol.element.parentNode.removeChild(symbol.element);
        }
      });
    };
  }, [mounted]);

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ background: "linear-gradient(to bottom, #0a0a0a, #1a1a2e)" }}
    >
      {!mounted && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" />
      )}
    </div>
  );
};

export default ThreeBackground;