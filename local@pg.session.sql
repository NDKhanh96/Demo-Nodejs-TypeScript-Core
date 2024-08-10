drop database homestay_management;
create database homestay;

\c homestay;

-- Rest of your code here
CREATE TABLE City (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE Homestay (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    city_id INT,
    num_bedroom INT CHECK (num_bedroom > 0),
    price FLOAT CHECK (price > 0),
    num_bathroom INT CHECK (num_bathroom > 0),
    description VARCHAR(255),
    FOREIGN KEY (city_id) REFERENCES City(id)
);

INSERT INTO City (name) VALUES
('City1'), ('City2'), ('City3'), ('City4'), ('City5'),
('City6'), ('City7'), ('City8'), ('City9'), ('City10');

INSERT INTO Homestay (name, idCity, num_bedroom, price, num_bathroom, description) VALUES
('Homestay1', 1, 2, 100.0, 1, 'Description1'),
('Homestay2', 2, 3, 150.0, 2, 'Description2'),
('Homestay3', 3, 1, 80.0, 1, 'Description3'),
('Homestay4', 4, 2, 120.0, 1, 'Description4'),
('Homestay5', 5, 3, 200.0, 2, 'Description5'),
('Homestay6', 6, 2, 110.0, 1, 'Description6'),
('Homestay7', 7, 1, 90.0, 1, 'Description7'),
('Homestay8', 8, 2, 130.0, 1, 'Description8'),
('Homestay9', 9, 3, 160.0, 2, 'Description9'),
('Homestay10', 10, 2, 140.0, 1, 'Description10'),
('Homestay11', 1, 1, 70.0, 1, 'Description11'),
('Homestay12', 2, 2, 150.0, 1, 'Description12'),
('Homestay13', 3, 3, 180.0, 2, 'Description13'),
('Homestay14', 4, 2, 110.0, 1, 'Description14'),
('Homestay15', 5, 1, 85.0, 1, 'Description15'),
('Homestay16', 6, 2, 120.0, 1, 'Description16'),
('Homestay17', 7, 3, 190.0, 2, 'Description17'),
('Homestay18', 8, 2, 100.0, 1, 'Description18'),
('Homestay19', 9, 1, 75.0, 1, 'Description19'),
('Homestay20', 10, 2, 130.0, 1, 'Description20'),
('Homestay21', 1, 3, 170.0, 2, 'Description21'),
('Homestay22', 2, 2, 140.0, 1, 'Description22'),
('Homestay23', 3, 1, 80.0, 1, 'Description23'),
('Homestay24', 4, 2, 150.0, 1, 'Description24'),
('Homestay25', 5, 3, 200.0, 2, 'Description25'),
('Homestay26', 6, 2, 110.0, 1, 'Description26'),
('Homestay27', 7, 1, 90.0, 1, 'Description27'),
('Homestay28', 8, 2, 120.0, 1, 'Description28'),
('Homestay29', 9, 3, 160.0, 2, 'Description29'),
('Homestay30', 10, 2, 130.0, 1, 'Description30'),
('Homestay31', 1, 1, 70.0, 1, 'Description31'),
('Homestay32', 2, 2, 150.0, 1, 'Description32'),
('Homestay33', 3, 3, 180.0, 2, 'Description33'),
('Homestay34', 4, 2, 110.0, 1, 'Description34'),
('Homestay35', 5, 1, 85.0, 1, 'Description35'),
('Homestay36', 6, 2, 120.0, 1, 'Description36'),
('Homestay37', 7, 3, 190.0, 2, 'Description37'),
('Homestay38', 8, 2, 100.0, 1, 'Description38'),
('Homestay39', 9, 1, 75.0, 1, 'Description39'),
('Homestay40', 10, 2, 130.0, 1, 'Description40'),
('Homestay41', 1, 3, 170.0, 2, 'Description41'),
('Homestay42', 2, 2, 140.0, 1, 'Description42'),
('Homestay43', 3, 1, 80.0, 1, 'Description43'),
('Homestay44', 4, 2, 150.0, 1, 'Description44'),
('Homestay45', 5, 3, 200.0, 2, 'Description45'),
('Homestay46', 6, 2, 110.0, 1, 'Description46'),
('Homestay47', 7, 1, 90.0, 1, 'Description47'),
('Homestay48', 8, 2, 120.0, 1, 'Description48'),
('Homestay49', 9, 3, 160.0, 2, 'Description49'),
('Homestay50', 10, 2, 130.0, 1, 'Description50'),
('Homestay51', 1, 1, 70.0, 1, 'Description51'),
('Homestay52', 2, 2, 150.0, 1, 'Description52'),
('Homestay53', 3, 3, 180.0, 2, 'Description53'),
('Homestay54', 4, 2, 110.0, 1, 'Description54'),
('Homestay55', 5, 1, 85.0, 1, 'Description55'),
('Homestay56', 6, 2, 120.0, 1, 'Description56'),
('Homestay57', 7, 3, 190.0, 2, 'Description57'),
('Homestay58', 8, 2, 100.0, 1, 'Description58'),
('Homestay59', 9, 1, 75.0, 1, 'Description59'),
('Homestay60', 10, 2, 130.0, 1, 'Description60'),
('Homestay61', 1, 3, 170.0, 2, 'Description61'),
('Homestay62', 2, 2, 140.0, 1, 'Description62'),
('Homestay63', 3, 1, 80.0, 1, 'Description63'),
('Homestay64', 4, 2, 150.0, 1, 'Description64'),
('Homestay65', 5, 3, 200.0, 2, 'Description65'),
('Homestay66', 6, 2, 110.0, 1, 'Description66'),
('Homestay67', 7, 1, 90.0, 1, 'Description67'),
('Homestay68', 8, 2, 120.0, 1, 'Description68'),
('Homestay69', 9, 3, 160.0, 2, 'Description69'),
('Homestay70', 10, 2, 130.0, 1, 'Description70'),
('Homestay71', 1, 1, 70.0, 1, 'Description71'),
('Homestay72', 2, 2, 150.0, 1, 'Description72'),
('Homestay73', 3, 3, 180.0, 2, 'Description73'),
('Homestay74', 4, 2, 110.0, 1, 'Description74');
