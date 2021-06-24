
## Deploy BSLFarm Factory contract
1. Config file .env 
- BSC_API_KEY : 
https://bscscan.com/myapikey tạo nick trên bscscan rồi tạo api key 
- TESTNET_PRIVATE_KEY: private key của nick testnet
- Sau khi config xong chạy lệnh để deploy BSLFarm
```javascript
npx hardhat --network testnet run scripts/deployBSLFarm.js
```
- Chạy câu lệnh 
```javascript 
npx hardhat --network testnet run scripts/deployZapBSC.js
```

## Components

- BSLFarm là smart contract cho phép người dùng deposit lp Token được lấy từ Pancake để nhận thưởng là BSL token
- BSLFarm bao gồm các biến và struct sau

  - struct UserInfo {
    uint256 amount;
    uint256 rewardDebt;
    uint pendingReward;
    } - Thông tin của user 

  - struct PoolInfo {
    IERC20 lpToken;
    uint256 allocPoint;
    uint256 lastRewardBlock;
    uint256 accRewardTokenPerShare;
    } - Thông tin của pool

  - IBEP20 public rewardToken; - token nhận thưởng (BSL token)

  - uint256 public rewardTokenPerBlock ; - số token trả thưởng trên mỗi block (300.000 BSL 1 tháng => 0.34222 BSL 1 block)

  - PoolInfo[] public poolInfo; - mảng danh sách thông tin của các pool

  - mapping(uint256 => mapping(address => UserInfo)) public userInfo; mapping để lấy thông tin user của từng pool qua poolID

  - uint256 public totalAllocPoint = 0; - tổng trọng số của mỗi pool

  - uint256 public startBlock; - block bắt đầu tính reward

  - event Deposit(address indexed user, uint256 indexed pid, uint256 amount) - emit khi user Deposit;

  - event Withdraw(address indexed user, uint256 indexed pid, uint256 amount) - emit khi user withdraw token ;

  - event EmergencyWithdraw(
    address indexed user,
    uint256 indexed pid,
    uint256 amount
    ); - emit khi user withdraw token mà k quan tâm đến thưởng

  - event HarvestReward(
    address indexed user,
    uint256 indexed pid,
    uint256 amount
    ); - emit khi user harvest token

- BSL Farm contract bao gồm các hàm sau

  - constructor - public function bao gồm 3 arguments: instance của reward token, số lượng BSL token per
    block và  block bắt đầu farming

  - poolLength - external function - Trả về số lượng pool trong farm

  - add - public function Khởi tạo pool mới cho lp token mới  . Chỉ Owner có thể add

  - set - public function - Set lại trọng số cho mỗi pool . Chỉ Owner có thể set

  - timeMultiplier - public function - Trả về số lượng thời gian đã farm trong pool (số block đã farm)

  - setRewardTokenPerBlock - public function -  Set lại lượng thưởng BSL mỗi block. Chỉ có Owner mới làm đc

  - pendingRewardToken - public view function -  Trả về số lượng reward của user.

  - massUpdatePools - public function - Update lại toàn bộ pool

  - updatePool - public function -Update pool để tính reward

  - deposit - public function - User deposit  lp token từ Pancake vào pool để nhận lại
    reward(BSL Token)

  - withdraw - public function -  User withdraw lại lượng lp token đã farm

  - emergencyWithdraw - public function - User withdraw lượng lp token mà không quan tâm đến thưởng. EMERGENCY ONLY


  - harvest - public function - User có thể harvest lượng thưởng từ việc farming

  - harvestAll - public function- User có thể harvest tất cả lượng thưởng trong tất cả các pool mà user deposit

  - safeRewardTransfer - internal function -đảm bảo việc chuyển reward Token một cách an toàn

## ZapBSC
- 