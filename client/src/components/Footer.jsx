import React from 'react';
import {Facebook,Twitter, Instagram , Linkedin} from 'lucide-react';

function Footer() {
    return ( 
        <>
        <footer className="bg-gray-800 py-4 mt-8 h-100">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} JobsNext. All rights reserved.</p>
                <div className="text-muted mb-2">Connect with us at</div>
                <a href="https://www.facebook.com/JobsNext" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-500 me-3">
                    <Facebook size={24} className="inline-block mr-2" />
                </a>
                <a href="https://www.facebook.com/JobsNext" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-500 me-3">
                    <Twitter size={24} className="inline-block mr-2" />
                </a>
                <a href="https://www.facebook.com/JobsNext" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-500 me-3">
                    <Instagram size={24} className="inline-block mr-2" />
                </a>
                <a href="https://www.facebook.com/JobsNext" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-500">
                    <Linkedin size={24} className="inline-block mr-2" />
                </a>
            </div>
        </footer>
        </>
     );
}

export default Footer;