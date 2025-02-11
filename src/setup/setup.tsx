import {
    Box,
    ChevronLeft,
    ChevronRight,
    CircleAlert,
    LaptopMinimal,
    LaptopMinimalCheck,
    MinimizeIcon,
    Monitor,
    PuzzleIcon,
    Settings,
    Sparkles,
} from "lucide-solid";
import { For, createSignal } from "solid-js";
import { render } from "solid-js/web";
import { Motion } from "solid-motionone";

interface StepProps {
    currentStep: number;
    onNext: () => void;
    onBack: () => void;
    isValid?: boolean;
    onStateUpdate?: ((value: string | null) => void) | undefined;
}

const Welcome = ({ onNext }: { onNext: () => void }) => (
    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} class="text-center">
        <Sparkles class="w-8 h-8 text-purple-400 mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent">
            Welcome to Legcord
        </h1>
        <p class="text-gray-400 mb-8">Let's get you set up with your perfect configuration.</p>
        <Motion.button
            onClick={onNext}
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium"
        >
            Get Started
        </Motion.button>
    </Motion.div>
);

const WindowStyle = ({ onNext, onBack, isValid, onStateUpdate }: StepProps) => {
    const [selectedStyle, setSelectedStyle] = createSignal<string | null>(null);

    const handleStyleSelect = (styleId: string) => {
        const newValue = selectedStyle() === styleId ? null : styleId;
        setSelectedStyle(newValue);
        onStateUpdate?.(newValue);
    };

    const styles = [
        {
            id: "native",
            title: "Native Window",
            description: "Use your system's default window decorations",
            screenshot: "https://placehold.co/600x400",
        },
        {
            id: "custom",
            title: "Custom Titlebar",
            description: "Use Legcord's custom titlebar design",
            screenshot: "https://placehold.co/600x400",
        },
    ];

    return (
        <div class="space-y-6">
            <div class="text-center">
                <Monitor class="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h2 class="text-2xl font-bold text-white mb-2">Choose Window Style</h2>
                <p class="text-gray-400">Select how Legcord appears on your machine</p>
            </div>

            <div class="space-y-4">
                <For each={styles}>
                    {(item) => (
                        <Motion.button
                            onClick={() => handleStyleSelect(item.id)}
                            class={`group relative w-full p-4 rounded-xl transition-all duration-300 text-left ${
                                selectedStyle() === item.id
                                    ? "bg-purple-900/40 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                                    : "bg-gray-800/40 border border-gray-700/30 hover:bg-gray-800/60"
                            }`}
                        >
                            <div class="flex items-center gap-4">
                                <div class="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.screenshot}
                                        alt={`${item.title} preview`}
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-white">{item.title}</h3>
                                    <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                                </div>
                                <div
                                    class={`w-5 h-5 rounded-full border-2 transition-colors ${
                                        selectedStyle() === item.id ? "border-purple-400" : "border-gray-600"
                                    }`}
                                >
                                    {selectedStyle() === item.id && (
                                        <div class="w-3 h-3 m-0.5 rounded-full bg-purple-400" />
                                    )}
                                </div>
                            </div>
                        </Motion.button>
                    )}
                </For>
            </div>
        </div>
    );
};

const TraySettings = ({ onNext, onBack, isValid, onStateUpdate }: StepProps) => {
    const [selectedOption, setSelectedOption] = createSignal<string | null>(null);

    const handleOptionSelect = (optionId: string) => {
        const newValue = selectedOption() === optionId ? null : optionId;
        setSelectedOption(newValue);
        onStateUpdate?.(newValue);
    };

    const options = [
        {
            id: "enable",
            title: "Enable Tray Icon",
            description: "Show Legcord in your system tray",
            icon: LaptopMinimalCheck,
        },
        {
            id: "disable",
            title: "Disable Tray Icon",
            description: "Don't show Legcord in your system tray",
            icon: LaptopMinimal,
        },
    ];

    return (
        <div class="space-y-6">
            <div class="text-center">
                <MinimizeIcon class="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h2 class="text-2xl font-bold text-white mb-2">System Tray</h2>
                <p class="text-gray-400">Choose whether to enable the system tray icon</p>
            </div>

            <div class="space-y-4">
                <div class="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3">
                    <CircleAlert class="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                        <p class="text-yellow-200/80 text-sm mt-0.5">
                            System tray functionality may have issues or behave differently on Linux systems.
                        </p>
                    </div>
                </div>

                <For each={options}>
                    {(option) => (
                        <Motion.button
                            onClick={() => handleOptionSelect(option.id)}
                            class={`group relative w-full p-4 rounded-xl transition-all duration-300 text-left ${
                                selectedOption() === option.id
                                    ? "bg-purple-900/40 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                                    : "bg-gray-800/40 border border-gray-700/30 hover:bg-gray-800/60"
                            }`}
                        >
                            <div class="flex items-start gap-4">
                                <div
                                    class={`w-10 h-10 rounded-lg transition-colors flex items-center justify-center ${
                                        selectedOption() === option.id ? "bg-purple-500/20" : "bg-gray-800/40"
                                    }`}
                                >
                                    <option.icon class="w-6 h-6 text-purple-400" />
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-white">{option.title}</h3>
                                    <p class="text-gray-400 text-sm mt-1">{option.description}</p>
                                </div>
                                <div
                                    class={`w-5 h-5 rounded-full border-2 transition-colors ${
                                        selectedOption() === option.id ? "border-purple-400" : "border-gray-600"
                                    }`}
                                >
                                    {selectedOption() === option.id && (
                                        <div class="w-3 h-3 m-0.5 rounded-full bg-purple-400" />
                                    )}
                                </div>
                            </div>
                        </Motion.button>
                    )}
                </For>
            </div>
        </div>
    );
};

const Finish = ({ onNext, onBack }: StepProps) => (
    <div class="text-center">
        <Box class="w-8 h-8 text-purple-400 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-white mb-4">You're All Set!</h2>
        <p class="text-gray-400 mb-6">Your Legcord configuration is complete and personalized to your preferences.</p>
        <div class="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30 mb-6">
            <Settings class="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p class="text-sm text-gray-400">
                Need to make changes later? You'll find all these options in Discord's settings menu under Legcord.
            </p>
        </div>
        <Motion.button
            onClick={onNext}
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium"
        >
            Launch Legcord
        </Motion.button>
    </div>
);

const ModSelector = ({ onNext, onBack, isValid }: StepProps) => {
    const [selectedMod, setSelectedMod] = createSignal<string | null>(null);

    const mods = [
        {
            id: "vencord",
            title: "Vencord",
            description: "Client mod with plugins and themes.",
            icon: "/vencord.png",
        },
        {
            id: "equicord",
            title: "Equicord",
            description: "A fork of Vencord with more plugins.",
            icon: "/equicord.png",
        },
    ];

    return (
        <div class="space-y-6">
            <div class="text-center">
                <PuzzleIcon class="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h2 class="text-2xl font-bold text-white mb-2">Choose Your Client Mod</h2>
                <p class="text-gray-400">
                    Legcord includes Shelter out of the box, but you can also choose another client mod if wanted.
                </p>
            </div>

            <div class="space-y-3">
                <For each={mods} fallback={<div>Loading...</div>}>
                    {(mod) => (
                        <Motion.button
                            onClick={() => setSelectedMod(selectedMod() === mod.id ? null : mod.id)}
                            class={`group relative w-full p-4 rounded-xl transition-all duration-300 text-left ${
                                selectedMod() === mod.id
                                    ? "bg-purple-900/40 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                                    : "bg-gray-800/40 border border-gray-700/30 hover:bg-gray-800/60"
                            }`}
                        >
                            <div class="flex items-start gap-4">
                                <div
                                    class={`w-10 h-10 rounded-lg transition-colors overflow-hidden ${
                                        selectedMod() === mod.id ? "bg-purple-500/20" : "bg-gray-800/40"
                                    }`}
                                >
                                    <img
                                        src={mod.icon}
                                        alt={`${mod.title} icon`}
                                        class="w-full h-full object-contain p-1.5"
                                    />
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-white">{mod.title}</h3>
                                    <p class="text-gray-400 text-sm mt-1">{mod.description}</p>
                                </div>
                                <div
                                    class={`w-5 h-5 rounded-full border-2 transition-colors ${
                                        selectedMod() === mod.id ? "border-purple-400" : "border-gray-600"
                                    }`}
                                >
                                    {selectedMod() === mod.id && (
                                        <div class="w-3 h-3 m-0.5 rounded-full bg-purple-400" />
                                    )}
                                </div>
                            </div>
                        </Motion.button>
                    )}
                </For>
            </div>

            <Motion.button
                onClick={onNext}
                class={`w-full px-6 py-2.5 rounded-xl border transition-colors font-medium
          ${
              selectedMod() === null
                  ? "border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  : "border-gray-700/30 text-gray-500 hover:border-purple-500/50 hover:text-purple-400 hover:bg-purple-500/10"
          }`}
            >
                Use Shelter Only
            </Motion.button>
        </div>
    );
};

interface StepStates {
    windowStyle: string | null;
    modSelector: string | null;
    traySettings: string | null;
}

export default function Stepper() {
    const [currentStep, setCurrentStep] = createSignal(0);

    const [stepStates, setStepStates] = createSignal<StepStates>({
        windowStyle: null,
        modSelector: null,
        traySettings: null,
    });

    const steps = [
        { component: Welcome, label: "Welcome", isValid: true },
        { component: WindowStyle, label: "Window Style", isValid: stepStates().windowStyle !== null },
        { component: ModSelector, label: "Client Mods", isValid: true }, // Always valid bc Shelter is default
        { component: TraySettings, label: "Tray Settings", isValid: stepStates().traySettings !== null },
        { component: Finish, label: "Finish", isValid: true },
    ];

    const CurrentStepComponent = steps[currentStep()].component;
    const isLastStep = currentStep() === steps.length - 1;
    const isFirstStep = currentStep() === 0;

    const handleNext = () => {
        if (currentStep() < steps.length - 1 && steps[currentStep()].isValid) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep() > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleStateUpdate = (step: keyof typeof stepStates) => (value: string | null) => {
        setStepStates((prev) => ({
            ...prev,
            [step]: value,
        }));
    };

    return (
        <div class="min-h-screen flex items-center justify-center">
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                class="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#171631] via-gray-900 to-[#171631] backdrop-blur-xl border border-gray-800/50 shadow-2xl"
            >
                <CurrentStepComponent
                    currentStep={currentStep()}
                    onNext={handleNext}
                    onBack={handleBack}
                    isValid={steps[currentStep()].isValid}
                    onStateUpdate={
                        currentStep() === 1
                            ? // @ts-expect-error
                              handleStateUpdate("windowStyle")
                            : currentStep() === 3
                              ? // @ts-expect-error
                                handleStateUpdate("traySettings")
                              : undefined
                    }
                />

                {!isFirstStep && !isLastStep && (
                    <div class="mt-8 flex items-center justify-between">
                        <Motion.button
                            onClick={handleBack}
                            class="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors inline-flex items-center gap-2"
                        >
                            <ChevronLeft class="w-4 h-4" />
                            Back
                        </Motion.button>

                        <div class="px-4 py-1 rounded-full bg-gray-800/50 text-gray-400 font-medium text-sm">
                            Step {currentStep() + 1} of {steps.length}
                        </div>

                        <Motion.button
                            onClick={handleNext}
                            disabled={!steps[currentStep()].isValid}
                            class={`px-6 py-2.5 rounded-xl text-white font-medium transition-colors inline-flex items-center gap-2 ${
                                steps[currentStep()].isValid
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                                    : "bg-gray-700 cursor-not-allowed opacity-50"
                            }`}
                        >
                            Next
                            <ChevronRight class="w-4 h-4" />
                        </Motion.button>
                    </div>
                )}
            </Motion.div>
        </div>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    render(Stepper, rootElement);
} else {
    console.error("Root element not found");
}
