import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { BrowserRouter } from "react-router-dom";
import  React from "react";

describe('Login Page', () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);

    test('Login title should be displayed', () => {
        const linkElement = screen.getByText("Login");
        expect(linkElement).toBeInTheDocument();
    });
});

