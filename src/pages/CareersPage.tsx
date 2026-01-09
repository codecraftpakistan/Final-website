import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Upload, Send } from 'lucide-react';

const CareersPage = () => {
  useSmoothScroll();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    countryCode: '+92',
    email: '',
    role: '',
    experience: '',
    details: ''
  });

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ul211pn';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_8p37vwx';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ENc8vDenN56kJFs3S';
  const EMAILJS_AUTO_REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID || 'template_autoreply'; // Replace with valid Template ID

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setFileName(file.name);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // 1. Send Admin Notification
        const adminPayload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: `Job Application: ${formData.role}`,
            message: `
            Name: ${formData.name}
            Email: ${formData.email}
            Contact: ${formData.countryCode} ${formData.contact}
            Post: ${formData.role}
            Experience: ${formData.experience} years
            Details: ${formData.details}
            Resume File Name: ${fileName}
            `,
            to_email: 'codecraftpakistan@gmail.com',
            reply_to: formData.email,
        },
        };

        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminPayload),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Email send failed');
        }

        // 2. Send Auto-Reply to Candidate
        // We don't block on auto-reply failure, just log it.
        sendAutoReply().catch(err => console.error("Auto-reply failed:", err));

        toast.success("Application submitted successfully! Please check your email for confirmation.");
        setFormData({ name: '', contact: '', countryCode: '+92', email: '', role: '', experience: '', details: '' });
        setFileName("No file chosen");
        if(fileInputRef.current) fileInputRef.current.value = '';

    } catch (err: unknown) {
        console.error('Send error:', err);
        const message = err instanceof Error ? err.message : String(err);
        toast.error(`Failed to submit application: ${message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  const sendAutoReply = async () => {
        const autoReplyMessage = `Dear ${formData.name},

Thank you for applying to Code Craft Pakistan for the position of ${formData.role}.

We have successfully received your application along with your resume.
Our recruitment team will carefully review your application and, if your profile matches our requirements, we will contact you for the next steps.

Please note that due to the large number of applications, only shortlisted candidates will be contacted.

If you have any questions, feel free to reply to this email.

Best regards,
Bilal Ahmad
CEO, Code Craft Pakistan
Email: codecraftpakistan@gmail.com
Website: www.codecraftpakistan.com
Location: Abdara road, peshawar, Pakistan`;

        const autoReplyPayload = {
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_AUTO_REPLY_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
                to_name: formData.name,
                to_email: formData.email,
                position: formData.role,
                company_name: "Code Craft Pakistan",
                reply_message: autoReplyMessage
            },
        };

        console.log("Attempting to send auto-reply...");
        console.log("Auto-reply payload:", autoReplyPayload);

        return fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(autoReplyPayload),
        }).then(res => {
            if (res.ok) console.log("Auto-reply sent successfully!");
            else res.text().then(text => console.error("Auto-reply failed response:", text));
            return res;
        });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="relative py-12 lg:py-24 overflow-hidden">
             {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left space-y-6"
                    >
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                            <span className="text-primary glow-text">Career</span>
                        </h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light leading-relaxed">
                            Job openings in <span className="text-foreground font-medium">IT Company</span>. <br/>
                            <span className="gradient-text font-semibold">Apply Now!</span>
                        </p>
                    </motion.div>

                    {/* Right Column: Application Form */}
                     <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md bg-black/40">
                             <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-foreground/80">Name</Label>
                                    <Input 
                                        id="name" 
                                        required 
                                        placeholder="Enter your full name" 
                                        className="bg-muted/50 border-white/10 focus:border-primary/50"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact" className="text-foreground/80">Contact Number</Label>
                                    <div className="flex gap-2">
                                        <Select value={formData.countryCode} onValueChange={handleCountryCodeChange}>
                                            <SelectTrigger className="w-[120px] bg-muted/50 border-white/10 focus:border-primary/50">
                                                <SelectValue placeholder="Code" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="+92">🇵🇰 +92</SelectItem>
                                                <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                                <SelectItem value="+44">🇬🇧 +44</SelectItem>
                                                <SelectItem value="+971">🇦🇪 +971</SelectItem>
                                                <SelectItem value="+91">🇮🇳 +91</SelectItem>
                                                <SelectItem value="+61">🇦🇺 +61</SelectItem>
                                                <SelectItem value="+1">🇨🇦 +1</SelectItem>
                                                <SelectItem value="+49">🇩🇪 +49</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input 
                                            id="contact" 
                                            type="tel" 
                                            required 
                                            placeholder="300 1234567" 
                                            className="flex-1 bg-muted/50 border-white/10 focus:border-primary/50"
                                            value={formData.contact}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground/80">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        required 
                                        placeholder="Enter your email address" 
                                        className="bg-muted/50 border-white/10 focus:border-primary/50"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-foreground/80">Apply For Which Post?</Label>
                                    <Select required onValueChange={handleSelectChange} value={formData.role}>
                                        <SelectTrigger className="bg-muted/50 border-white/10 focus:border-primary/50">
                                            <SelectValue placeholder="Choose your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Flutter Developer">Flutter Developer</SelectItem>
                                            <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                                            <SelectItem value="Senior React Developer">Senior React Developer</SelectItem>
                                            <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                                            <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                     <Label htmlFor="experience" className="text-foreground/80">Years of Experience</Label>
                                     <Input 
                                        id="experience" 
                                        type="number" 
                                        min="0" 
                                        placeholder="0" 
                                        className="bg-muted/50 border-white/10 focus:border-primary/50"
                                        value={formData.experience}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="details" className="text-foreground/80">Other Details</Label>
                                    <Textarea 
                                        id="details" 
                                        placeholder="Tell us more about yourself..." 
                                        className="bg-muted/50 border-white/10 focus:border-primary/50 resize-none h-24"
                                        value={formData.details}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-foreground/80 block mb-2">Upload Your Resume</Label>
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            onClick={handleFileClick}
                                            className="cursor-pointer bg-muted/30 hover:bg-muted/50 border-dashed border-2 border-white/20"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Choose File
                                        </Button>
                                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">{fileName}</span>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="gradient"
                                    className="w-full text-lg py-6 mt-4 shadow-lg hover:shadow-primary/20 transition-all duration-300"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Application
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
