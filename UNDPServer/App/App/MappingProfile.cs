﻿using Account.Entities;
using AutoMapper;
using Data.Entities;
using Data.Entities.FleetManagement;
using Data.Entities.Shared;
using Data.Entities.UserManagement;
using FleetManagement.Entities;
using Shared.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace App
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            #region Settings
            CreateMap<Company, CompanyDTO>();
            CreateMap<CompanyDTO, Company>();

            CreateMap<AccountTree, AccountTree>();
            CreateMap<AccountTree, AccountTree>();

            #endregion

            #region Users Management
            CreateMap<UserProfile, UserProfileDTO>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
                .ForMember(dest => dest.DeviceId, opt => opt.MapFrom(src => src.UserDevice.DeviceId));


            CreateMap<UserProfileDTO, UserProfile>();
            #endregion

            #region Fleet Management
            CreateMap<CarRequest, CarRequestDTO>()
                 .ForMember(trip => trip.DriverName, opt => opt.MapFrom(src => src.Driver.FirstName + " " + src.Driver.LastName)); ;
            //.ForMember(dest => dest.DateFrom, opt => opt.MapFrom(src => src.DateFrom.ToString("dd/MM/yyyy HH:mm tt")))
            //.ForMember(dest => dest.DateTo, opt => opt.MapFrom(src => src.DateTo.ToString("dd/MM/yyyy HH:mm tt")));

            CreateMap<CarRequestDTO, CarRequest>();
            //.ForMember(dest => dest.DateFrom, opt => opt.MapFrom(src => DateTime.ParseExact(src.DateFrom, "dd/MM/yyyy HH:mm tt", null)))
            //.ForMember(dest => dest.DateTo, opt => opt.MapFrom(src => DateTime.ParseExact(src.DateTo, "dd/MM/yyyy HH:mm tt", null)));
            #endregion

            #region Trip
            CreateMap<Trip, TripDTO>()
                 .ForMember(trip => trip.SequenceNumber, opt => opt.MapFrom(src => src.CarRequest.SequenceNumber))
                 .ForMember (trip=>trip.CarBrand ,opt=>opt.MapFrom(src=>src.Car.CarBrand +" - "+ src.Car.CarNumber ))
                 .ForMember(trip => trip.DriverId, opt => opt.MapFrom(src => src.CarRequest.DriverId))
                 .ForMember(trip => trip.PickUp, opt => opt.MapFrom(src => src.CarRequest.PickUp))
                 .ForMember(trip => trip.Destination, opt => opt.MapFrom(src => src.CarRequest.Destination))
                 .ForMember(trip => trip.DriverName, opt => opt.MapFrom(src => src.CarRequest.Driver.FirstName + " "+ src.CarRequest.Driver.LastName))
                 .ForMember(trip => trip.Email, opt => opt.MapFrom(src => src.CarRequest.RequesterEmail));

            CreateMap<TripDTO, Trip>();

            #endregion

            #region Car
            CreateMap<Car, CarDTO>();
            CreateMap<CarDTO, Car>();
            #endregion
        }
    }
}
