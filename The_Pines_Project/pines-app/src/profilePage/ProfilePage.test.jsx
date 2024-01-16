import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import  React from "react";
import ProfilePage from './ProfilePage';

describe('Profile Page', () => {
    render(<BrowserRouter><ProfilePage /></BrowserRouter>);

    test('All static text should be displayed', () => {
        const titleElement = screen.getByText("Profile Page");
        expect(titleElement).toBeInTheDocument();

        const emailElement = screen.getByText("Email Address");
        expect(emailElement).toBeInTheDocument();

        const addressElement = screen.getByText("Address");
        expect(addressElement).toBeInTheDocument();

        const phoneNumberElement = screen.getByText("Phone Number");
        expect(phoneNumberElement).toBeInTheDocument();
    });
});