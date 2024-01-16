import { render, screen } from '@testing-library/react';
import VerificationPage from './VerificationPage';
import { BrowserRouter } from "react-router-dom";
import  React from "react";

describe('Verification Page', () => {
    render(<BrowserRouter><VerificationPage /></BrowserRouter>);

    test('Verify title should be displayed', () => {
        const linkElement = screen.getByText('Verify');
        expect(linkElement).toBeInTheDocument();
    });
});