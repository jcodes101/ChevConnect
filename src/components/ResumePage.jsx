import React, { useState, useCallback } from 'react';
import { UploadCloud, LoaderCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';

const ResumePage = () => {
    const [file, setFile] = useState(null);
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [matchScore, setMatchScore] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
    });

    const handleCheckMatch = async () => {
        if (!file && !linkedInUrl) {
            alert("Please upload a resume or provide a LinkedIn URL.");
            return;
        }
        setLoading(true);
        setMatchScore(null); // Reset previous score

        const formData = new FormData();
        if (file) {
            formData.append('resume', file);
            console.log('File:', file.name); // Log to check if the file is attached
        } else {
            formData.append('linkedin', linkedInUrl);
            console.log('LinkedIn URL:', linkedInUrl); // Log to check if LinkedIn URL is provided
        }

        try {
            const response = await fetch('http://localhost:3001/api/check-match', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Match data:', data); // Log the response from the backend
                setMatchScore(data.matchScore);
            } else {
                const errorData = await response.json(); // Capture error message from backend
                console.error('Error checking match:', errorData.error); // Log error
                alert(`Error: ${errorData.error}`); // Show detailed error message
            }
        } catch (error) {
            console.error('Error checking match:', error);
            alert("An unexpected network error occurred. Please try again later."); // More specific network error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-5xl font-bold mb-6">What Is Your Career Match?</h1>

            <div
                {...getRootProps()}
                className="w-96 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 mb-4"
            >
                <input {...getInputProps()} />
                {file ? (
                    <p>Uploaded: {file.name}</p>
                ) : (
                    <p className="text-gray-600 flex items-center justify-center">
                        <UploadCloud className="mr-2" /> Drag and drop your resume here or click to upload
                    </p>
                )}
            </div>

            <p className="my-2 text-gray-500">OR</p>

            <input
                type="text"
                placeholder="Paste your LinkedIn profile URL"
                className="border p-2 rounded w-96 mb-4"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
            />

            <Link
            to="/dash"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            {/* //     onClick={handleCheckMatch}
                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                 disabled={loading || (!file && !linkedInUrl)}
            
                 {loading ? <LoaderCircle className="animate-spin inline" /> : "Check Match"} */}
                 Check Matches
            </Link>

            {matchScore !== null && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded shadow">
                    Your Chevron Job Match Score: <strong>{matchScore}%</strong>
                    {matchScore > 75 && <p className="mt-2">Great match! You're a strong candidate for Chevron jobs.</p>}
                    {matchScore <= 75 && <p className="mt-2">Consider improving your skills to better match Chevron's job requirements.</p>}
                </div>
            )}
        </div>
    );
};

export default ResumePage;