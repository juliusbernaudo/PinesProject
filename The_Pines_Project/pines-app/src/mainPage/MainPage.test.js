import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';
import { BrowserRouter } from "react-router-dom";
import  React from "react";

describe('Main Page', () => {
  render(<BrowserRouter><MainPage /></BrowserRouter>);

  test('Title should be displayed', () => {
    const linkElement = screen.getByText("Item Place Tracker");
    expect(linkElement).toBeInTheDocument();
  });
});

